import React from 'react'
import ProductCarousel from './productsCarousel'
import { products } from '@/config/products.config'
import { ProductResType } from '@/types/product'

function index({title,collectionType}:{title:string,collectionType:string}) {

    const filteredProducts:ProductResType[] = React.useMemo(() => (products.filter(product => product.collectionType === collectionType)),[title,collectionType])

    // console.log(filteredProducts)

  return (
    <div className='w-full my-5 space-y-10'>
        <h1 className='text-5xl text-gray-700 font-bold text-center'>{title}</h1>
      <ProductCarousel products={filteredProducts}/>
    </div>
  )
}

export default index
