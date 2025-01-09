"use client";
import { UserI } from '@/types/user';
import React, { useEffect } from 'react'
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useFetchUser from '@/hooks/useFetchUser';
import DetailsSkeleton from '@/components/DetailsSkeleton';
import ProfileImage from '@/components/ProfileImage';
import EditProfileImageModal from '@/components/dashboard/EditProfileImageModal';
import UserData from '@/components/dashboard/UserData';
import DeleteProfileImageModal from '@/components/dashboard/DeleteProfileImageModal';

const UserDetailsPage = () => {
    const { data, error, isLoading } = useFetchUser();

    const openUploadModal = () => {
        const dialog = document.getElementById(
            "profile_image_modal"
        ) as HTMLDialogElement; // Cast to HTMLDialogElement
        dialog.showModal();
    };

    const openDeleteModal = () => {
        const dialog = document.getElementById(
            "profile_image_delete_modal"
        ) as HTMLDialogElement; // Cast to HTMLDialogElement
        dialog.showModal();
    };


    if (isLoading) {
        return <DetailsSkeleton lines={2} />;
    }

    if (error) {
        return (
            <div>
                <h2>Error fetching user details</h2>
                <p>{error.description || "An unexpected error occurred."}</p>
            </div>
        );
    }

    return (
        <div className={`hero bg-base-200 min-h-[40vh] w-full md:w-[90%] mx-auto mb-5 px-10 rounded-xl`}>
            <div className="hero-content w-full flex-col lg:flex-row max-w-none justify-between gap-10 lg:gap-14">
                <div>
                    <ProfileImage height={350} width={350} hClass='h-48' wClass='w-48' borderClass='border-[5px]'>

                        <button
                            className="text-white text-2xl hover:text-accent"
                            onClick={() => {
                                openUploadModal();
                            }}
                            aria-label="Edit Image"
                        >
                            <FiEdit />
                        </button>
                        <button
                            className="text-white text-2xl hover:text-red-400"
                            onClick={() => { openDeleteModal()}}
                            aria-label="Delete Image"
                        >
                            <FiTrash2 />
                        </button>

                    </ProfileImage>
                </div>
                <div className={`flex flex-col w-full items-start`}>
                    <h1 className="text-4xl font-bold">{data?.data.firstName} {data?.data.lastName} </h1>
                    <UserData email={data?.data.email!}  posts={15} viewsCount={1200} />

                </div>
            </div>
            <dialog id="profile_image_modal" className="modal">
                <EditProfileImageModal />
            </dialog>
            <dialog id="profile_image_delete_modal" className="modal modal-bottom sm:modal-middle">
                <DeleteProfileImageModal />
            </dialog>
        </div>
    );
};
export default UserDetailsPage