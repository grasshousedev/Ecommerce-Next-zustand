import {create} from "zustand"
import Cookies from "js-cookie"

export const useStore =  create(
    
    (set) => ({
      
        mode: {
            darkMode: Cookies.get('darkMode') === 'ON' ? true : false
        },

        cart : {
            dishes : []
        },

        darkModeOn: () => 
        set (() => ({
            mode: {
                darkMode: true
            }
            
        })),

        
        darkModeOff: () =>
        set (() => ({
            mode:{
                darkMode: false
            }
        })),

   
      

        
        addDish: (data) =>
        set ((state) => ({
            cart : {
                dishes : [... state.cart.dishes, data]
            }
        })),

    //     addDish: (data) =>
    //     set ((state) => ({
    //         cart : {
    //             dishes : [... state.cart.dishes, data]
    //         }
    //     }), () => {
    //             typeof window !== 'undefined' && localStorage.setItem('dishes', JSON.stringify(useStore.getState().cart.dishes))
    // }),

        
        removeDish : (index) =>
        set((state) => ({
            cart : {
                dishes : state.cart.dishes.filter((_, i) => i != index)
            }

        })),

    
        resetCart: () => 
        set(() =>({
            cart: {
                dishes: []
            }
        })),

    })
)
