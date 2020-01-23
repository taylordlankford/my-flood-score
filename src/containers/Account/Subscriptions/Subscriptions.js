import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { pushInfo, pushDanger } from "../../../redux/actions/notificationActions";
import Table from "react-bootstrap/Table";
import { Title } from "../../../StyledComponents/StyledComponents";
import { AccountContext } from "../AccountContext";
import Subscription from "./Subscription";
import Notification from "../../../components/Notifications/Notification";
import Spinner from "react-bootstrap/Spinner";

import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { TransitionBtn } from "../../../StyledComponents/StyledComponents";
import "./subscriptions.css";

const Subscriptions = () => {
  const dispatch = useDispatch()
  const { firestoreUser, firebase } = useContext(AccountContext);
  const [subs, setSubs] = useState(null);
  const [subsTableData, setSubsTableData] = useState([]);
  const [handlingCancel, setHandlingCancel] = useState(false)
  const [canceled, setCanceled] = useState(false)

  useEffect(() => {
    if (typeof firestoreUser.customerId !== "undefined") {
      firebase.doGetSubscriptions(firestoreUser.customerId).then(subs => {
        console.log("subs", subs);
        setSubs(subs.data.subs);
        populateColumns(subs.data.subs);
      });
    }
  }, []);

  const handleSubCancel = async (id) => {
    console.log('canceling sub', id)
    setHandlingCancel(true)
    const s = await firebase.doCancelSubscription(id)
    console.log('s', s.data.subscription)
    setHandlingCancel(false)
    firestoreUser.subscriptions.pop(s);
    const updatedUser = {
      ...firestoreUser,
    }
    console.log(updatedUser)
    if (s.data.subscription.status === 'canceled') {
      setCanceled(true)
      dispatch(pushInfo('Subscription canceled'))
      firebase.doFirestoreSet("users", firestoreUser.uid, updatedUser)
    } else {
      dispatch(pushDanger('Failed to cancel subscription. Please try again or contact us'))
    }
  }

  const actions = sub => (
    <TransitionBtn
      onClick={() => handleSubCancel(sub.id)}
      disabled={handlingCancel}
    >
      {!handlingCancel ? (
        "Cancel"
      ) : (
        <>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{ marginLeft: "-15px", marginRight: "15px" }}
          />
          <span>Processing..</span>
        </>
      )}
    </TransitionBtn>
  );

  const getAmount = (sub) => {
    let amount = 0
    sub.items.data.forEach(item => {
      amount += item.quantity * item.plan.amount
    })
    amount = (amount / 100).toFixed(2)
    return amount
  }

  const populateColumns = (subs) => {
    let currentSubs = []
    let startDate = ""
    let nextBillDue = ""

    console.log(subs)

    subs.map((sub, index) => {
      startDate = moment(new Date(sub.start_date * 1000))
        .tz("America/New_York")
        .format("MM/DD/YYYY");

      nextBillDue = moment(new Date(sub.current_period_end * 1000))
        .tz("America/New_York")
        .format("MM/DD/YYYY HH:mm z");

      currentSubs.push(
        {
          plan: sub.plan.nickname,
          created: startDate,
          nextBillDue: nextBillDue,
          total: getAmount(sub),
          actions: actions(sub)
        }
      );
    });

    setSubsTableData(currentSubs)
  };

  const columns = [
    {
      dataField: 'plan',
      text: 'Plan',
      sort: true
    },
    {
      dataField: 'created',
      text: 'Created At',
      sort: true
    },
    {
      dataField: 'nextBillDue',
      text: 'Next Bill Due',
      sort: true
    },
    {
      dataField: 'total',
      text: 'Total',
      sort: true
    },
    {
      dataField: 'actions',
      text: 'Actions'
    }
  ]

  if (!subs) {
    return "No subscriptions yet";
  }

  if (canceled) {
    return null
  }

  return (
    <>
      <Notification />

      <BootstrapTable
        keyField="id"
        data={subsTableData}
        columns={columns}
        bordered={false}
        pagination={paginationFactory({ hidePageListOnlyOnePage: true })}
      />

      {/*
        <Table responsive borderless>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Crated At</th>
              <th>Next Bill Due</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((sub, index) => (
              <Subscription sub={sub} index={index} />
            ))}
          </tbody>
        </Table>
            */}
    </>
  );
};

export default Subscriptions;
