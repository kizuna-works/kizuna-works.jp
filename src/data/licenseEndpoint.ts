// License GAS web app (/exec) used by the supporter form, the trial form and the application confirmation page.
// PUBLIC_LICENSE_GAS_URL overrides it for local testing against the test GAS (never set it for production builds).
export const LICENSE_GAS_URL: string =
  import.meta.env.PUBLIC_LICENSE_GAS_URL ||
  'https://script.google.com/macros/s/AKfycbzqMJ9CTBR0qC5F9yF5a4W3uPGhq105cft0ONflVGJcdsNsS-eg82U_Th5_qRZnIm6B_A/exec';
