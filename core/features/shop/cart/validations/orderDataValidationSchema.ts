import { array, number, object, string } from "yup";

export const orderValidationSchema = object({
  addressData: object().required(
    "Zapisz adres lub wybierz jeden z istniejących"
  ),
  paymentType: string().required("Musisz wybrać typ płatności"),
  shippingOption: string().required("Musisz wybrać sposób wysyłki"),
  shippingType: string().required(),
  additionalShippingData: string().when("shippingType", {
    is: "pickupPoint",
    then: (schema) => schema.required("Musisz wybrać punkt"),
  }),
  discountCode: string(),
  orderMessage: string(),
  order: array().of(
    object({
      product: string().required(),
      quantity: number().positive(),
    })
  ),
});
