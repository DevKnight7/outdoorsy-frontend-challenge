export default interface Rentals {
  id: string;
  type: string;
  attributes: {
    name: string;
    primary_image_url: string;
  };
}
