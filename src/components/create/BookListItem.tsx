import { Book } from '@/types/book'
import React from 'react'
import { BiPurchaseTagAlt } from "react-icons/bi";

const BookListItem = ({
  index,
  book
}: {
  book : Book,
  index : number
}) => {
  return (
    <li className="list-row">
    {/* <div className="text-4xl font-thin opacity-30 tabular-nums">{index<10 ? `0${index}` : index}</div> */}
    <div><img className="size-12 md:size-14 lg:size-16 rounded-box" src={book.volumeInfo.imageLinks.smallThumbnail}/></div>
    <div className="list-col-grow text-base md:text-lg">
      <div>{book.volumeInfo.title}</div>
      <div className={`text-xs font-semibold opacity-60 ${book.volumeInfo?.authors?.length>0 ? "" : "hidden"}`}>{book.volumeInfo?.authors?.join(", ")}</div>
    </div>
    <button className="btn btn-square btn-ghost">
      <BiPurchaseTagAlt className={`w-6 h-6 mr-2 cursor-pointer`} />    
    </button>
  </li>
  )
}

export default BookListItem