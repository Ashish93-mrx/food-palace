import { useEffect, useState } from "react";

const debounce = (callBackFn, delay=500) => {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(()=>
            callBackFn(...args)
        ,delay);
    }
}

export default debounce;