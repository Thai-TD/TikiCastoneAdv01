'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Input, InputRef } from 'antd';
import { formatCurrency } from '@/utils';
import { getProductDetail } from "../../api/productsAPI"; // Adjust the import as necessary
import { usePathname } from 'next/navigation';

interface CartItem {
  id: string;
  quantity: number;
  price: number;
  image: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  const [image, setImage] = useState<string>('/products/belt-1.png');
  const inputRef = useRef<InputRef>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [productName, setProductName] = useState<string>('');
  
  // const router = useRouter();
  // const slug = router.query.slug;
  // console.log(slug, "data slug");
  const pathname = usePathname().split("/");
  const slug = pathname[pathname.length - 1];
  console.log(slug, "data slug");
  // Only run the effect when slug is available
  useEffect(() => {
    if (!slug) return;

    const fetchProductDetail = async (slug: string) => {
      try {
        const detailResponse:any = await getProductDetail(slug);
        const data = detailResponse.data;
        console.log(data, "data detailResponse");
        if (data) {
          setPrice(data.price);
          setProductName(data.name);
          setImage(data.image || '/products/default.png');
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (pathname && typeof pathname === 'string') {
      fetchProductDetail(pathname);
    }
  }, [pathname]);

  const handlePrice = (type: string) => {
    if (inputRef.current?.input) {
      let quantity = parseInt(inputRef.current.input.value) || 1;

      if (type === '+') {
        inputRef.current.input.value = (quantity + 1).toString();
      } else if (type === '-') {
        if (quantity > 1) {
          inputRef.current.input.value = (quantity - 1).toString();
        }
      }
    }
  };

  const addToCart = () => {
    if (inputRef.current?.input) {
      const quantity = parseInt(inputRef.current.input.value) || 1;
      const product: CartItem = {
        id: params.slug,
        quantity,
        price,
        image,
      };
    
      let updatedCart = [...cart, product];
      console.log(updatedCart, "your product cards");
      setCart(updatedCart);
      alert("Product added to cart!");
    }
  };

  if (!productName) {
    return <div>Product not found</div>;
  }

  return (
    <div className='flex flex-row mb-5 gap-6 w-[90%]'>
      <div className='flex flex-col w-[27%] bg-white p-4 rounded-md sticky h-fit top-5'>
        <Image
          className='rounded-lg w-full'
          src={image}
          width={368}
          height={368}
          alt='Product'
          unoptimized
        />
        <div className='flex flex-row gap-2 mt-2'>
          {['belt-1', 'belt-2', 'belt-3', 'belt-4'].map((img) => (
            <Image
              key={img}
              className='border-gray-100 border p-1 rounded-md'
              src={`/products/${img}.png`}
              width={47}
              height={47}
              onMouseEnter={() => setImage(`/products/${img}.png`)}
              alt={`Thumbnail for ${img}`}
              unoptimized
            />
          ))}
        </div>
        <hr className='my-3' />
      </div>
      <div className='w-[40%] flex flex-col gap-4'>
        <div className='bg-white p-3 rounded-lg h-fit'>
          <span className='font-medium text-2xl mt-2 inline-block'>{productName}</span>
          <div>
            <span className='font-semibold text-2xl mt-2 inline-block'>
              {formatCurrency('vi-VN', 'VND', price)}
            </span>
            <sup>₫</sup>
          </div>
          <div className='flex flex-row gap-1 mt-3'>
            <div className='flex flex-row gap-1'>
              <span className='text-lg font-semibold mt-3 inline-block'>Số lượng</span>
              <div className='flex flex-row gap-1'>
                <div
                  className='w-10 cursor-pointer hover:bg-gray-100 text-gray-500 text-2xl font-semibold h-8 flex items-center justify-center border rounded-md border-gray-200'
                  onClick={() => handlePrice('-')}
                >
                  -
                </div>
                <Input
                  ref={inputRef}
                  className='w-10 h-8 text-center'
                  type='number'
                  defaultValue={1}
                />
                <div
                  className='w-10 cursor-pointer hover:bg-gray-100 text-gray-500 text-2xl font-semibold h-8 flex items-center justify-center border rounded-md border-gray-200'
                  onClick={() => handlePrice('+')}
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <button onClick={addToCart} className='bg-red-500 text-white rounded-md w-full h-10 mt-3'>
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
