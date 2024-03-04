import axios from "axios";

const AddressApi = () => {
  const dataCity = async () => {
    try {
      const response = await fetch(
        `https://vapi.vnappmob.com/api/province`
      ).then((res) => res.json());
      return response.results.map((city) => ({
        label: city.province_name,
        value: city.province_id,
      }));
    } catch (error) {
      console.error("Error fetching city data:", error);
      return [];
    }
  };

  const dataDis = async (selectedCityCode) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${selectedCityCode}`
      );
      return response.data.results.map((dis) => ({
        label: dis.district_name,
        value: dis.district_id,
      }));
    } catch (error) {
      console.error("Error fetching district data:", error);
      return [];
    }
  };

  const dataProvince = async (selectedDisCode) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${selectedDisCode}`
      );
      return response.data.results.map((province) => ({
        label: province.ward_name,
        value: province.ward_id,
      }));
    } catch (error) {
      console.error("Error fetching province data:", error);
      return [];
    }
  };

  return { dataCity, dataDis, dataProvince };
};

export default AddressApi;
