'use client'
import axios from "axios";

const BACKEND_URL = "http://localhost:8080";//process.env.BACKEND_URL;
const token = localStorage.getItem('token');
export async function getProductDetail(id) {
  console.log('getProductDetail ...........');
  console.log(token,'localStorage token');
  let data = await axios.get(`${BACKEND_URL}/products/${id}`,
    {
      headers:{
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return data;
  return {};
}

export async function getProducts() {
  console.log(token,"token products0");
  let data = await axios.get(`${BACKEND_URL}/products`,
    {
      headers:{
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return data;
}