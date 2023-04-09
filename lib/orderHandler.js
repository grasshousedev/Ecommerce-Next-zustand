

export const createOrder = async({name, phone, address, dishSluges, dishQuantities, dishSizes, total, paymentMethod, formattedDate }) => {

  
    const res =  await fetch('/api/order', {
        method: "POST",
        body: JSON.stringify({
            date: formattedDate,
            name: name,
            phone: phone,
            address: address,
            dishSluges: dishSluges,
            dishQuantities: dishQuantities,
            dishSizes: dishSizes,
            total: total,
            method: paymentMethod,
            status: 1,
        }),
    });
    const  id= await res.json()
    return id

}