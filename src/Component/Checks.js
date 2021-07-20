function isEmpty(txt){
    if(txt.length==0)
    {return true}
    else
    {return false}
}

function isAlphabets(txt){
    if(/^[A-Za-z]+/.test(txt))
    {return true}
    else
    {return false}
}

function isDigits(txt){
    if(/^[0-9]+/.test(txt))
    {return true}
    else
    {return false}
}

function pictureCheck(file)
{
    if(file.length==0)return true ;
    return false ;
}

function isMobile(txt){
    if(/^[0-9]{10}/.test(txt))
    {return true}
    else
    {return false}
}

function isNumber(txt){
    if(/^[0-9]/.test(txt))
    {return true}
    else
    {return false}
}

function isEmail(txt){
    if(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9+_.-]+$/.test(txt))
    {return true}
    else
    {return false}
}

export{isAlphabets,isMobile,isEmpty,isDigits,isEmail,pictureCheck,isNumber};