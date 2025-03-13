import type { OrderBody } from "~/core/api/order";

type FieldErrors = Array<{ path: string; message: string }>;

export const useFormErrorsHandling = (
  orderData: ComputedRef<OrderBody & { shippingType: string }>
) => {
  const errorsData = reactive<Record<string, string | undefined>>({});

  watch(orderData, (orderDataValue) => {
    Object.keys(errorsData).forEach((key) => {
      const newContentForCurrentKey =
        orderDataValue[key as keyof typeof orderDataValue];
      if (newContentForCurrentKey) {
        errorsData[key] = undefined;
      }
    });
  });

  const checkAndScrollToFailingDOMElement = (path: string) => {
    const errorElement = document.getElementById(path);
    if (!errorElement) {
      // Will throw only under development
      throw new Error(
        `checkAndScrollToFailingElement function failed. Couldn't find element with id ${path}, check your components configuration.`
      );
    }

    console.log(errorElement);
    window.scrollTo({
      top: (errorElement?.offsetTop ?? 0) - 40,
      behavior: "smooth",
    });
  };

  const assignErrorsToControls = (errors: FieldErrors) => {
    errors.forEach(({ path, message }) => (errorsData[path] = message));
  };

  const onErrorHandler = ({ errors }: { errors: FieldErrors }) => {
    assignErrorsToControls(errors);
    const firstErroredElementPath = errors[0]?.path;
    if (!document || !window || !firstErroredElementPath) return;
    checkAndScrollToFailingDOMElement(firstErroredElementPath);
  };

  return {
    onErrorHandler,
    errorsData,
  };
};
