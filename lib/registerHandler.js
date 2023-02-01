export  const createUser = async({name, email, password}) =>{

    const res = await fetch('/api/user/register', {
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        })
    })
    const id = await res.json()
    return id

}