"use client";
import useSearchBook from '@/hooks/useSearchBook';
import useUploadProfileImage from '@/hooks/useUploadProfileImage';
import { ResponseType } from '@/types/enums';
import { UploadProfileImageData } from '@/types/forms';
import { parseError, parseServerError } from '@/utils/errorParser';
import React, { ChangeEvent, ChangeEventHandler, EventHandler, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiSearchAlt } from "react-icons/bi";
import BooksList from './BooksList';
import { Book } from '@/types/book';

const SearchBook = ({
    setTaggedBook
}: {
    setTaggedBook : React.Dispatch<React.SetStateAction<Book|null>>,
}) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [searchWarning, setSearchWarning] = useState<string | null>(null);


    const handleQueryChange: ChangeEventHandler<HTMLInputElement> =
        (e) => {
            e.preventDefault();
            setSearchWarning(null);
            setSearchInput(e.target.value);
        }

    const handleModalClose = () => {

        setSearchInput("");
        setSearchQuery("");
    };


    const handleQuerySearch = () => {
        if (searchInput.length < 10) {
            setSearchWarning("Search query must be at least 10 characters long");
            return;
        }
        const sanitizedSearchQuery = searchInput.replace(/[ ,.-]/g, "+");
        setSearchQuery(sanitizedSearchQuery);
    }


    const handleBookTagging = (book : Book) => {
        setTaggedBook(book)
        handleModalClose();
        closeModal();
    }

    const closeModal = () => {
        const dialog = document.getElementById(
            "search_book_modal"
        ) as HTMLDialogElement;
        if (dialog?.open) {
            dialog.close();
        }
    };
    

    return (
        <>
            <div className="modal-box shadow-sm shadow-primary/20 max-w-4xl h-5/6 max-h-4xl">
                <h3 className="font-bold text-xl">Search Book for tagging</h3>
                <div className="divider"></div>
                <p className="py-4 text-sm text-warning">{searchWarning || "Only 1 book can be tagged"}</p>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search"
                        value={searchInput}
                        onChange={handleQueryChange} />
                    <BiSearchAlt onClick={handleQuerySearch} className={`h-6 w-6 cursor-pointer`} />
                </label>
                <div className={`w-full`}>

                    {searchQuery && <BooksList tagBook={handleBookTagging} searchQuery={searchQuery} />}
                </div>

                
            </div>
            <form method="dialog" className="modal-backdrop bg-black/60">
                <button onClick={handleModalClose}>close</button>
            </form>
        </>
    )
}

export default SearchBook