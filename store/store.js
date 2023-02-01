import create from "zustand"
import Cookies from "js-cookie"

export const useStore =  create(
    (set) => ({
       //DarkMode
        mode: {
            darkMode: Cookies.get('darkMode') === 'ON' ? true : false
        },

        //Unable darkmode
        darkModeOn: () => 
        set (() => ({
            mode: {
                darkMode: true
            }
        })),

        //Disable dark mode 
        darkModeOff: () =>
        set (() => ({
            mode:{
                darkMode: false
            }
        })),

         //cart 
         cart : {
            dishes : []
        },

        //Add pizza in cart
        addDish: (data) =>
        set ((state) => ({
            cart : {
                dishes : [... state.cart.dishes, data]
            }
        })),

        //Remove pizza 
        removeDish : (index) =>
        set((state) => ({
            cart : {
                dishes : state.cart.dishes.filter((_, i) => i != index)
            }

        })),

        //Empty the cart
        resetCart: () => 
        set(() =>({
            cart: {
                dishes: []
            }
        })),

        //User info
        userInfo: Cookies.get('userInfo')
        ? JSON.parse(Cookies.get('userInfo'))
        : null,

        
       //User login
       login: (data) =>
       set((state) => ({
            userInfo: {...state.userInfo, data}
       })),

       //User logout 
       logout: () =>
       set((state) =>({
        userInfo: null,
        cart: {
            dishes: []
        }
       }))

      
    })

  
)