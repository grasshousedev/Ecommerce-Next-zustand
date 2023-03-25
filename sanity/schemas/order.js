export default{
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            options:{
                maxLenght: 40
            }
        },

        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
            options:{
                maxLenght: 15
            }
        },

        {
            name: 'address',
            title: 'Address',
            type: 'string',
            options:{
                maxLenght: 100
            }
        },

        {
            name: 'dish',
            title: 'dish',
            type: 'string',
         

        },

        // {
        //     name: 'dish',
        //     title: 'dish',
        //     type: 'array',
        //     of: [{type: 'string'}]

        // },

        // {
        //     name: 'quantity',
        //     title: 'Quantity',
        //     type: 'array',
        //     of: [{type: 'number'}]

        // },

        {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',


        },

      

        {
            name: 'total',
            title: 'Total',
            type: 'number'
        },


        {
            name: 'method',
            title: 'Method',
            type: 'number',

        },

       

        
        {
            name: 'status',
            title: 'Status',
            type: 'number'
        }
        
        

    ]
}