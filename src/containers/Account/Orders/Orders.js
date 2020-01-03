import React, { useContext, useState, useEffect } from "react";
import useReactRouter from "use-react-router";
import * as ROUTES from "../../../routes/constants/routes";
import "./Orders.css";
import { Title, LinkPrimary } from "../../../StyledComponents/StyledComponents"
import { AccountContext } from "../AccountContext";
import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from "react-router-dom";
import { TransitionBtn } from "../../../StyledComponents/StyledComponents"

const Orders = () => {
  const { firestoreUser } = useContext(AccountContext)
  const { history } = useReactRouter()
  const [orders] = useState(firestoreUser.orders)
  const [ordersData, setOrdersData] = useState([])

  useEffect(() => {
    populateColumns()
  }, [])

  const getQuantity = items => {
    let totalQuantity = 0;
    items.forEach(item => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  const actionBtn = index => (
    <TransitionBtn onClick={() => history.push(ROUTES.ACCOUNT_ORDER + "/" + (index + 1).toString())}>
      <Link style={{ color: "#fff" }}>
        View
        </Link>
    </TransitionBtn>
  );

  // Populate columns with appropriate data
  const populateColumns = () => {
    let currentOrders = [];

    try {
      orders.map((order, index) => {
        let formattedDate = moment(new Date(order.timestamp.seconds * 1000)).format("MM/DD/YYYY")
        console.log(formattedDate)
        currentOrders.push({
          index: parseInt(index + 1),
          timestamp: formattedDate,
          type: order.type,
          items: `$${(order.amount / 100).toFixed(2)} for ${getQuantity(order.items)} items`,
          action: actionBtn(index)
        });
      });
    } catch (err) {
      // we just don't have orders yet
    }

    setOrdersData([...currentOrders])
  };

  const columns = [
    {
      dataField: "index",
      text: "Order No.",
      sort: true,
      style: {
        fontWeight: 'bold',
        color: '#55B96A'
      }
    },
    {
      dataField: "timestamp",
      text: "Date",
      sort: true
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      style: {
        fontWeight: '700'
      }
    },
    {
      dataField: "items",
      text: "Total",
      sort: true
    },
    {
      dataField: "action",
      text: "Action"
    }
  ];

  const defaultSorted = [{
    dataField: 'index',
    order: 'asc'
  }]

  return (
    <>
      {firestoreUser.orders === undefined ? (
        <>
          <p>You don't have any orders yet. :(</p>
          <p>
            Checkout our <LinkPrimary>Services.</LinkPrimary>{" "}
          </p>
        </>
      ) : (
        <>
          <div style={{ paddingBottom: "20px" }}>
            <Title>Your Orders</Title>
          </div>
          <BootstrapTable
            keyField="id"
            data={ordersData}
            columns={columns}
            bordered={false}
            defaultSorted={defaultSorted}
            pagination={paginationFactory({ hidePageListOnlyOnePage: true })}
          />

          {/*
          <Title>Orders</Title>
          <Table responsive borderless>
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Type</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <OrdersList orders={firestoreUser.orders} />
          </Table>
          */}
        </>
      )}
    </>
  );
};

export default Orders;
