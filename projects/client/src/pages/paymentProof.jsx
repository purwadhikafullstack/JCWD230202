import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterBar from "../components/footer";
import IconMandiri from "../support/assets/icon-mandiri.png";

export default function PaymentProof() {
	const [showDetail, setshowDetail] = useState(false);
	const Navigate = useNavigate();
	return (
		<div className=" overflow-hidden">
			<div className=" flex justify-center items-center pt-[50px]">
				<div className=" flex flex-col justify-center items-center w-[1190px] mt-[82px] ">
					<div className="w-[600px] h-[147px] px-4">
						<h1 className=" flex justify-center items-center w-full  mt-4 text-[20px] font-tokpedFont font-extrabold">
							Complete Payment in
						</h1>
						<p className=" flex justify-center items-center w-full mt-2 text-[20px] text-red-600 font-tokpedFont font-semibold">
							19:00:23
						</p>
						<p className=" flex justify-center items-center w-full  mt-4 text-[16px] text-gray-500 font-tokpedFont ">
							Payment Deadline
						</p>
						<p className=" flex justify-center items-center w-full  mt-2 text-[18px] font-tokpedFont font-extrabold ">
							Sabtu, 1 April 2023 18:39
						</p>
					</div>
					<div className=" rounded-lg border w-[600px] mt-[41px] ">
						<div className=" flex px-4 items-center justify-between border-b-[1px] h-[51px]">
							<h1 className=" font-tokpedFont font-semibold text-[16px]">
								Mandiri Virtual Account
							</h1>
							<img src={IconMandiri} className=" h-[18px] w-[64px]"></img>
						</div>
						<div className=" text-left mt-4 mx-4 h-[77px]">
							<p className=" mt-4 text-[14px] font-tokpedFont text-gray-500">
								Virtual Account Number
							</p>
							<p className=" mt-2 text-[18px] font-tokpedFont font-semibold">8870887805667895</p>
						</div>
						<div className=" text-left mb-4 mx-4 h-[77px]">
							<p className=" pt-4 text-[14px] font-tokpedFont text-gray-500">Total Payment</p>
							<div className=" flex justify-between w-full h-[29px]">
								<p className=" mt-2 text-[18px] font-tokpedFont font-semibold">Rp. 166.900</p>
								<button
									onClick={() => setshowDetail(true)}
									className=" font-tokpedFont font-semibold text-[16px] text-[#0095DA]"
								>
									See Details
								</button>
							</div>
						</div>
					</div>
					<div className=" h-[112px] flex items-center w-[600px] justify-between">
						<button
							onClick={() => Navigate("/transaction")}
							className=" w-[293px] border border-[#0095DA] rounded-xl outline-[#0095DA] text-[#0095DA] h-10 "
						>
							Cek Payment Status
						</button>
						<button
							onClick={() => Navigate("/home")}
							className=" w-[291px] border bg-[#0095DA] rounded-xl text-white h-10"
						>
							Shop Again
						</button>
					</div>
					<div className=" w-[600px] h-[21px]">
						<p className=" font-tokpedFont font-semibold text-[18px] ">Payment Method</p>
					</div>
					<div className=" mt-4 w-[600px] px-4 ">
						<p className=" mt-11 h-[13px] font-tokpedFont font-semibold text-[12px]">
							PAYMENT GUIDE
						</p>
						<Accordion mt="19px" defaultIndex={[0]} allowToggle>
							<AccordionItem border={"none"}>
								<h2>
									<AccordionButton _hover={"none"}>
										<Box
											fontWeight={"bold"}
											textColor={"gray.500"}
											fontSize={"14px"}
											as="span"
											flex="1"
											textAlign="left"
										>
											ATM Mandiri
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel borderBottom={"1px"} borderBottomColor="gray.300">
									<div className=" text-[14px] mt-4 mb-6 pl-3 flex flex-col gap-2 font-tokpedFont ">
										<p>1. Masukkan kartu ATM dan PIN </p>
										<p>2. Pilih menu "Bayar/Beli" </p>
										<p>3. Pilih menu "Lainnya", hingga menemukan menu "Multipayment"</p>
										<p>4. Masukkan Kode Biller Tokonglomerat (88708), lalu pilih Benar </p>
										<p>
											5. Masukkan "Nomor Virtual Account" Tokonglomerat, lalu pilih tombol Benar
										</p>
										<p>6. Masukkan Angka "1" untuk memilih tagihan, lalu pilih tombol Ya </p>
										<p>7. Akan muncul konfirmasi pembayaran, lalu pilih tombol Ya </p>
										<p>8. Simpan struk sebagai bukti pembayaran Anda</p>
									</div>
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem border={"none"}>
								<h2>
									<AccordionButton _hover={"none"}>
										<Box
											fontWeight={"bold"}
											textColor={"gray.500"}
											fontSize={"14px"}
											as="span"
											flex="1"
											textAlign="left"
										>
											Mandiri Internet Banking / Livin' By Mandiri
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel borderBottom={"1px"} borderBottomColor="gray.300">
									<div className=" text-[14px] mt-4 pb-[14px] pl-3 flex flex-col border-b-[1px] border-b-black gap-2 font-tokpedFont ">
										<p>1. Login Livin' By Mandiri dengan memasukkan Username dan Password </p>
										<p>2. Pilih menu "Pembayaran" </p>
										<p>3. Pilih menu "Multipayment"</p>
										<p>4. Pilih penyedia jasa "Tokonglomerat" </p>
										<p>
											5. Masukkan "Nomor Virtual Account" dan "Nominal" yang akan dibayarkan, lalu
											pilih Lanjut
										</p>
										<p>6. Setelah muncul tagihan, pilih Konfirmasi </p>
										<p>7. Masukkan PIN / Challenge Code Token </p>
										<p>8. Transaksi selesai, simpan bukti bayar Anda</p>
									</div>
									<p className="mt-2 text-[14px] font-tokpedFont">
										Jangan gunakan fitur "Simpan Daftar Transfer" untuk pembayaran melalui Internet
										Banking karena dapat mengganggu proses pembayaran berikutnya.
									</p>
									<p className="mt-4 text-[14px] font-tokpedFont">
										Untuk menghapus daftar transfer tersimpan ikuti langkah berikut:
									</p>
									<div className=" text-[14px] mt-2 pb-6 pl-3 flex flex-col gap-2 font-tokpedFont ">
										<p>1. Login Livin' By Mandiri</p>
										<p>2. Pilih ke menu Pembayaran </p>
										<p>3. Pilih menu Daftar Pembayaran</p>
										<p>4. Pilih pada pembayaran yang tersimpan, lalu pilih menu untuk hapus </p>
									</div>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</div>
			<FooterBar />
		</div>
	);
}
