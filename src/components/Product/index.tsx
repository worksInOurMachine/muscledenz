import React from 'react'
import ProductCarousel from './productsCarousel'
import { products } from '@/config/products.config'
import { ProductResType } from '@/types/product'

function index({title,collectionType}:{title:string,collectionType:string}) {

    const filteredProducts:ProductResType[] = React.useMemo(() => (products.filter(product => product.collectionType === collectionType)),[title,collectionType])

    console.log(filteredProducts)

  return (
    <div>
      <ProductCarousel products={filteredProducts}/>
    </div>
  )
}

export default index
