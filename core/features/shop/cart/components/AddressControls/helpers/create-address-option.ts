import type { AddressData } from "~/core/api/addresses";

export const createAddressOption = (
  addressData: AddressData,
  editHandler: (addressData: AddressData) => any,
  deleteHandler: (addressData: AddressData) => any
) => {
  const { id, type, fullName, street, postcode, city, phone } = addressData;

  return {
    value: id,
    icon:
      type == "company"
        ? "solar-buildings-line-duotone"
        : "solar-home-line-duotone",
    label: fullName,
    help: [
      type == "company" ? `NIP: ${addressData.nip}` : undefined,
      `ul. ${street}`,
      `${postcode} ${city}`,
      `tel:${phone}`,
    ]
      .filter((v) => v)
      .join("\n"),
    actions: [
      {
        tooltip: "Edytuj",
        button: {
          icon: "solar-pen-new-square-line-duotone",
          color: "white",
          size: "xs",
          click: () => editHandler(addressData),
        },
      },
      {
        tooltip: "Usuń",
        button: {
          icon: "solar-trash-bin-minimalistic-linear",
          color: "white",
          size: "xs",
          click: () => deleteHandler(addressData),
        },
      },
    ],
  };
};
