import DiscoverImg from '../assets/images/Discover.svg'
import compareImg from '../assets/images/Compare.svg'
import ExamineImg from '../assets/images/Examine.svg'
import certifyImg from '../assets/images/Certificate.svg'
import ReduceImg from '../assets/images/Reduce_Eliminate.svg'

export const cartInitState = {
  items: [
    {
      id: 0,
      title:'Discover Homeowner',
      img: DiscoverImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 0,
      type: 'single',
    },
    {
      id: 1,
      title:'Discover Homeowner+',
      img: DiscoverImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 500,
      type: 'single',
    },
    {
      id: 2,
      title:'Discover Business',
      img: DiscoverImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 1000,
      type: 'monthly',
      plan: 'plan_GD4tFIrEfqOPLx',
    },
    {
      id: 3,
      title:'Compare Homeowner',
      img: compareImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 500,
      type: 'single',
    },
    {
      id: 4,
      title:'Compare Homeowner+',
      img: compareImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 1000,
      type: 'single',
    },
    {
      id: 5,
      title:'Compare Business',
      img: compareImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 6000,
      type: 'monthly',
      plan: 'plan_GEq0gCG3Scmg4l',
    },
    {
      id: 6,
      title:'Examine Homeowner',
      img: ExamineImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 2500,
      type: 'single',
    },
    {
      id: 7,
      title:'Examine Business',
      img: ExamineImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 2500,
      type: 'monthly',
      plan: 'plan_GEq1bYW1biDgvH',
    },
    {
      id: 8,
      title:'Certify Homeowner',
      img: certifyImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 1000,
      type: 'single',
    },
    {
      id: 9,
      title:'Certify Business',
      img: certifyImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 1000,
      type: 'monthly',
      plan: 'plan_GEq24H2bM9Qofb',
    },
    {
      id: 10,
      title:'Reduce',
      img: ReduceImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 39500,
      type: 'single',
    },
  ],
  addedItems:[],
  total: 0,
}