

import Image from "next/image";
import { useEffect, useState } from "react";

function BackgroundImage() {
    const [url, setUrl] = useState("");
    useEffect(() => {
        setUrl(value => {
            return "/pattern/auth.svg"
            // return window.localStorage.getItem("daisy-theme")==="ivory" ? "/pattern/auth.svg" : "/pattern/blurryblob.svg";
        });
    }, [])
    return (
        <>
            <Image src={url} layout="fill" objectFit="cover" alt="auth pattern" className={`opacity-50`} />
        </>

    );
}

export default BackgroundImage;