import { Dot } from '@/components/shared/Dot';
import { Timeline } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

//DONE
export default function Page() {

  //API***
  const [orderDetails, setOrderDetails] = useState({
    deliveryDate: 'Thứ 7, 30/10',
    deliveredBy: 'GUMAC Official Store',
    items: [
      {
        name: 'Thắt lưng nam',
        image: '/products/belt-1.png',
        quantity: 1,
        seller: 'GUMAC Official store',
      },
      {
        name: 'Thắt lưng nam',
        image: '/products/belt-2.png',
        quantity: 1,
        seller: 'GUMAC Official store',
      },
      {
        name: 'Thắt lưng nam',
        image: '/products/belt-3.png',
        quantity: 1,
        seller: 'GUMAC Official store',
      },
    ],
    timeline: [
      {
        label: '09:51',
        status: 'Đang giao hàng',
        dateTime: '09:51, Thứ hai 01/11/2024',
        description: 'Nhân viên đang giao hàng',
      },
      {
        label: '09:51',
        status: 'Đơn hàng đã rời kho phân loại',
        dateTime: '09:51, Thứ hai 01/11/2024',
        description: 'Đã tới kho Bình Tân',
      },
      {
        label: '09:51',
        status: 'Đơn hàng đã rời kho phân loại',
        dateTime: '09:51, Thứ hai 01/11/2024',
        description: 'Đã rời kho Tân tạo',
      },
      {
        label: '09:51',
        status: 'Đơn hàng đã rời bưu cục',
        dateTime: '09:51, Thứ hai 01/11/2024',
        description: 'Đã rời bưu cục',
      },
      {
        label: '09:51',
        status: 'Đang được chuẩn bị',
        dateTime: '09:51, Thứ hai 01/11/2024',
        description: 'Người gửi đang chuẩn bị hàng',
      },
      {
        label: '09:51',
        status: 'Đặt hàng thành công',
        dateTime: '09:51, Thứ hai 01/11/2024',
        description: 'Đơn hàng đã được đặt',
      },
    ],
  });

  const getOrderInfo = () => {
    return {
      deliveryDate: orderDetails.deliveryDate,
      deliveredBy: orderDetails.deliveredBy,
      items: orderDetails.items,
      timeline: orderDetails.timeline,
    };
  };

  const orderInfo = getOrderInfo();

  return (
    <div className='w-[75%]'>
      <div className='text-lg font-semibold mb-4'>Đơn hàng</div>
      <div className='flex flex-row gap-4 w-full'>
        <div className='bg-white p-4 flex-col w-[70%] rounded-lg'>
          <div className='text-green-500 text-lg font-medium'>
            Giao vào {orderInfo.deliveryDate}
          </div>
          <div className='text-xs text-gray-500'>
            Được giao bởi {orderInfo.deliveredBy}
          </div>
          <hr className='my-3' />
          <Timeline className='mt-10 w-[60%]' mode='left'>
            {orderInfo.timeline.map((item, index) => (
              <Timeline.Item key={index} label={<span>{item.label}</span>} dot={<Dot style={'bg-green-500 border-green-300'} />}>
                <div className='w-[30rem]'>
                  <div className='text-lg text-green-500 font-semibold'>{item.status}</div>
                  <span className='text-sm text-gray-500'>{item.dateTime}</span>
                  <div>{item.description}</div>
                  <hr className='mt-5' />
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>

        <div className='w-[30%] bg-white h-fit p-4 rounded-lg'>
          <div>
            <span className='mb-7 text-lg font-semibold block'>Kiện hàng gồm</span>
            <div className='flex flex-col gap-3'>
              {orderInfo.items.map((item, index) => (
                <div className='flex flex-row items-center' key={index}>
                  <Image src={item.image} width={100} height={100} alt='pack' />
                  <div className='flex flex-col ml-2'>
                    <span className='font-semibold text-lg'>{item.name}</span>
                    <span className='text-gray-500 text-sm'>{item.seller}</span>
                    <span className='text-sm mt-2 text-gray-400'>Số lượng: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
