import voucherRepository from "../../src/repositories/voucherRepository";
import voucherService from "../../src/services/voucherService";
import { faker } from "@faker-js/faker";
import { conflictError, isAppError } from "../../src/utils/errorUtils";

describe("Voucher unit test", () => {
  it("Should create a voucher", async () => {
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockResolvedValueOnce(null);
    const code = faker.internet.userName();
    const discount = parseInt(faker.random.numeric());
    const result = await voucherService.createVoucher(code, discount);
    expect(result).toBe(undefined);
  });
  it("Should throw an error if the voucher exists", async () => {
    const code = faker.internet.userName();
    const discount = parseInt(faker.random.numeric());
    jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce({
      id: 1,
      discount,
      code,
      used: false,
    });
    try {
      await voucherService.createVoucher(code, discount);
    } catch (error) {
      expect(error).toHaveProperty("message", "Voucher already exist.");
    }
  });
  it("Should throw an error if the voucher does not exist", async () => {
    const code = faker.internet.userName();
    const discount = parseInt(faker.random.numeric());
    const amount = parseInt(faker.random.numeric(3));
    const id = parseInt(faker.random.numeric(40))
    jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce({
      id,
      discount,
      code,
      used: false,
    });
    try {
      await voucherService.applyVoucher(code, amount);
    } catch (error) {
      expect(error).toHaveProperty("message", "Voucher does not exist.");
    }
  });
//   it("Should apply a voucher", async () => {
//     const code = faker.internet.userName();
//     const discount = parseInt(faker.random.numeric());
//     const amount = parseInt(faker.random.numeric(3));
//     const id = parseInt(faker.random.numeric())
//     jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce({
//       id,
//       discount,
//       code,
//       used: false,
//     });
//       await voucherService.createVoucher(code, discount);
//       const result = await voucherService.applyVoucher(code, amount);
//   });
});