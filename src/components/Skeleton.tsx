const Skeleton = () => {
    return (
        <div className="flex flex-col gap-4 w-52">
            <div className="skeleton h-32 w-full bg-primary/20"></div>
            <div className="skeleton h-4 w-28 bg-primary/20"></div>
            <div className="skeleton h-4 w-full bg-primary/20"></div>
            <div className="skeleton h-4 w-full bg-primary/20"></div>
        </div>
    );
}

export default Skeleton;