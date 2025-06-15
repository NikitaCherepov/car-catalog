import axios from 'axios';
import { toast } from 'sonner';

class CarService {
  BASE_URL = '/api/cars';
  async getAllCars(filter: 'asc' | 'desc' | '', page: number) {
    try {
      const params = new URLSearchParams();
      params.set('_limit', '12');
      params.set('_page', String(page));
      if (filter) {
        params.set('_sort', 'price');
        params.set('_order', filter);
      }
      const url = `${this.BASE_URL}?${params.toString()}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Ответ ошибки:', error.response.data);
      } else {
        console.error(error);
      }
      toast.error('Произошла ошибка при соединении');
      throw error;
    }
  }
}

const carService = new CarService();
export default carService;
