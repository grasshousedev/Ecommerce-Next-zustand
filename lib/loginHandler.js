export  const loginUser = async({email, password}) =>{

    const res = await fetch('/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    const id = await res.json()
    return id

}