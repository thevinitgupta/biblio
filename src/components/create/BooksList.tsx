"use client"
import { Book, BookSearchResponse } from '@/types/book';
import React, { ChangeEventHandler, Fragment, useEffect, useState } from 'react'
import BookListItem from './BookListItem';
import useSearchBook from '@/hooks/useSearchBook';

const BooksList = ({
  searchQuery,
}: {
  searchQuery: string;
}) => {
  const [selectedPage, setSelectedPage] = useState("1");
  const [pages, setPages] = useState(0);

  const { data, isLoading, error } = useSearchBook({ query: searchQuery });


  const handleOptionChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedPage(event.target.ariaLabel!);
  };


  const getPaginatedData = (books: Array<Book>) : Array<Book> => {
    return books.slice(
      (parseInt(selectedPage) - 1) * 5,
      Math.min(books.length, (parseInt(selectedPage)) * 5)
    )
  }

  useEffect(() => {
    if(!isLoading && !error){
      const booksLength = data?.items.length!;
      setPages(booksLength / 5 + (booksLength % 5 > 0 ? 1 : 0));
      setSelectedPage("1")
    }
    () => {

    }
  }, [data])

  return (
    <>
      <ul className="list bg-base-100 rounded-box shadow-md">

        <li className="pb-2 text-xs opacity-60 tracking-wide my-4">Search Results for : {searchQuery}</li>
        {isLoading && <div className="flex justify-center items-center"><span className='loading loading-spinner text-accent w-5 md:w-8 h-5 md:h-8'></span></div>}
        {!isLoading && error && <p className={'text-error text-lg md:text-xl'}>Error : {error.description}</p>}
        {!isLoading && !error && data &&
          getPaginatedData(data.items)?.map((book, index) => (
            <Fragment key={book.id}>
              <BookListItem book={book} index={index + 1}></BookListItem>
              {
                index !== data.items.length - 1 && <div className='divider'></div>
              }
            </Fragment>
          ))
        }


      </ul>
      {!isLoading && !error && data &&
        <div className="join w-full justify-center">
          {
            Array.from({ length: pages }, (_, index) => {
              const option = (index + 1).toString();
              return (
                <input
                  key={option}
                  className="join-item btn btn-square"
                  type="radio"
                  name="options"
                  aria-label={option}
                  defaultChecked={option === selectedPage}
                  onChange={handleOptionChange}
                />
              );
            })}
        </div>
      }
    </>
  )
}

export default BooksList