// import axios from "axios";
// import { Message } from "";

// export const fetchDetailPromotions = createAsyncThunk(
//     "detailPromotions/fetchDetailPromotions", async (payload) => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8072/detail-promotion/hien-thi",
//           payload
//         );
//         return response.data;
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           message.error("Unauthorized: Please log in.");
//         }
//         throw error;
//       }
//     }
//   );
  
//   // export const fetchDetailPromotions = createAsyncThunk(
//   //   "detailPromotions/fetchDetailPromotions", async (payload) => {
//   //     try {
//   //       const response = await axios.post(
//   //         "http://localhost:8072/detail-promotion/hien-thi/condition",
//   //         payload
//   //       );
//   //       return response.data;
//   //     } catch (error) {
//   //       if (error.response && error.response.status === 401) {
//   //         message.error("Unauthorized: Please log in.");
//   //       }
//   //       throw error;
//   //     }
//   //   }
//   // );
  
//   export const add = createAsyncThunk(
//     "detailPromotions/add", async (payload) => {
//       try {
//         const response = await axios.post(
//           `http://localhost:8072/detail-promotion/add`, payload);
//         return response.data;
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           message.error("Unauthorized: Please log in.");
//         }
//         throw error;
//       }
//     });
  
//   export const detail = createAsyncThunk(
//     'detailPromotions/detail', async (payload) => {
//       try {
  
//         const response = await axios
//           .get(`http://localhost:8072/detail-promotion/hien-thi/${payload}`);
//         console.log("Object:" + response.data.data)
//         return response.data.data;
  
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           message.error("Unauthorized: Please log in.");
//         }
//         throw error;
//       }
//     });
  
//   export const update = createAsyncThunk(
//     "detailPromotions/update", async (payload) => {
//       try {
  
//         const response = await axios
//           .post(`http://localhost:8072/detail-promotion/update/${payload.id}`
//             , payload);
//         console.log("Object", response.data)
//         return response.data;
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           message.error("Unauthorized: Please log in.");
//         }
//       }
//     }
//   );
  
//   export const Delete = createAsyncThunk(
//     "detailPromotions/Delete", async (payload) => {
//       try {
//         const response = await axios
//           .post(`http://localhost:8072/promotion/delete/${payload}`);
  
//         return response.data;
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           message.error("Unauthorized: Please log in.");
//         }
//       }
//     }
//   );

// export default AddressApi;
