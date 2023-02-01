import category from "./category";

export default{
    name: "food",
    title: "Food",
    type: "document",
    fields: [
        {
            name: "image",
            type: "image",
            title: "image",
            options:{
                hotspot: true
            }

        },

        {
            name:"name",
            title: "name",
            type: "string",

        },

        {
            name: "category",
            title: "Category",
            type: "reference",
            to: [{type: 'category'}]
        },

        {
            name: "slug",
            title: "slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 90
            }
        },

        {
            name: "price",
            title: "price",
            type: "array",
            of: [{type: "number"}]

        },

        {
            name: "details",
            title: "details",
            type: "string"
        }
  
    ]
}
