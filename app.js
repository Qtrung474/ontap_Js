let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400
  },
  {
    bookingCode: "CIN-002",
    customerName: "Trần Thị Bình",
    movieTitle: "Biệt Đội Sao Băng",
    ticketCount: 4,
    pricePerTicket: 90000,
    totalAmount: 349920
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520
  }
];

function formatCurrency(amount) {
  return amount.toLocaleString("vi-VN") + " VNĐ";
}

function formatTitleCase(str) {
  return str
    .trim()
    .split(/\s+/)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function validateBookingCode(code) {
  if (code === "") {
    return "Chưa nhập mã đặt vé";
  }
  if (code.length < 6) {
    return "Độ dài nhỏ hơn 6 ký tự";
  }
  if (!code.startsWith("CIN-")) {
    return "Sai tiền tố \"CIN-\"";
  }
  if (code.includes(" ")) {
    return "Chứa khoảng trắng";
  }
  if (findBookingIndex(code) !== -1) {
    return "Mã đặt vé đã tồn tại";
  }
  return "";
}

function findBookingIndex(code) {
  return bookings.findIndex((b) => {
    return b.bookingCode === code;
  });
}

function inputPositiveInteger(message) {
  while (true) {
    const input = prompt(message);
    if (input === null) {
      return null;
    }
    const trimmed = input.trim();
    const num = Number(trimmed);
    if (trimmed !== "" && Number.isInteger(num) && num > 0) {
      return num;
    }
    console.log("Giá trị phải là số nguyên lớn hơn 0, vui lòng nhập lại!");
  }
}

function calculateTotal(ticketCount, pricePerTicket) {
  const baseCost = ticketCount * pricePerTicket;
  const discount = ticketCount >= 4 ? Math.round(baseCost * 0.1) : 0;
  const serviceFee = Math.round((baseCost - discount) * 0.08);
  const totalAmount = baseCost - discount + serviceFee;
  return { baseCost, discount, serviceFee, totalAmount };
}

function displayBookings(list) {
  if (list.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }
  let totalRevenue = 0;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    totalRevenue += item.totalAmount;
    console.log(`${i + 1}. ${item.bookingCode} - ${item.customerName} - ${item.movieTitle}`);
    console.log(`   SL: ${item.ticketCount} | Giá: ${formatCurrency(item.pricePerTicket)} | Tổng TT: ${formatCurrency(item.totalAmount)}`);
  }
  console.log(`Tổng: ${list.length} đơn đặt vé – Doanh thu: ${formatCurrency(totalRevenue)}`);
}

function handleDisplayBookings() {
  displayBookings(bookings);
}

function handleAddBooking() {
  const rawCode = prompt("Nhập mã đặt vé:");
  if (rawCode === null) {
    console.log("Hủy thao tác thêm đơn đặt vé");
    return;
  }
  const bookingCode = rawCode.trim().toUpperCase();
  const codeError = validateBookingCode(bookingCode);
  if (codeError !== "") {
    console.log(`Lỗi: ${codeError}`);
    return;
  }

  let customerName = "";
  while (true) {
    const rawCustomer = prompt("Nhập tên khách hàng:");
    if (rawCustomer === null) {
      console.log("Hủy thao tác thêm đơn đặt vé");
      return;
    }
    const trimmedCustomer = rawCustomer.trim();
    if (trimmedCustomer !== "") {
      customerName = formatTitleCase(trimmedCustomer);
      break;
    }
    console.log("Tên khách hàng không được để trống, vui lòng nhập lại!");
  }

  let movieTitle = "";
  while (true) {
    const rawMovie = prompt("Nhập tên phim:");
    if (rawMovie === null) {
      console.log("Hủy thao tác thêm đơn đặt vé");
      return;
    }
    const trimmedMovie = rawMovie.trim();
    if (trimmedMovie !== "") {
      movieTitle = formatTitleCase(trimmedMovie);
      break;
    }
    console.log("Tên phim không được để trống, vui lòng nhập lại!");
  }

  const ticketCount = inputPositiveInteger("Nhập số vé:");
  if (ticketCount === null) {
    console.log("Hủy thao tác thêm đơn đặt vé");
    return;
  }

  const pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé (VNĐ):");
  if (pricePerTicket === null) {
    console.log("Hủy thao tác thêm đơn đặt vé");
    return;
  }

  const { baseCost, discount, serviceFee, totalAmount } = calculateTotal(ticketCount, pricePerTicket);

  const newBooking = {
    bookingCode,
    customerName,
    movieTitle,
    ticketCount,
    pricePerTicket,
    totalAmount
  };
  bookings.push(newBooking);

  console.log("==================================================");
  console.log("              HÓA ĐƠN ĐẶT VÉ MỚI                  ");
  console.log("==================================================");
  console.log(`Mã đặt vé      : ${bookingCode}`);
  console.log(`Khách hàng     : ${customerName}`);
  console.log(`Tên phim       : ${movieTitle}`);
  console.log(`Số vé          : ${ticketCount}`);
  console.log(`Giá mỗi vé     : ${formatCurrency(pricePerTicket)}`);
  console.log(`Chi phí cơ sở  : ${formatCurrency(baseCost)}`);
  console.log(`Giảm giá       : ${formatCurrency(discount)}`);
  console.log(`Phí dịch vụ    : ${formatCurrency(serviceFee)}`);
  console.log(`Tổng thanh toán: ${formatCurrency(totalAmount)}`);
  console.log("==================================================");
  console.log("Thêm đơn đặt vé thành công!");
}

function handleUpdateBooking() {
  const rawCode = prompt("Nhập mã đặt vé cần cập nhật:");
  if (rawCode === null) {
    console.log("Đã hủy cập nhật");
    return;
  }
  const bookingCode = rawCode.trim().toUpperCase();
  const index = findBookingIndex(bookingCode);
  if (index === -1) {
    console.log(`Không tìm thấy đơn đặt vé có mã ${bookingCode}`);
    return;
  }

  const booking = bookings[index];
  const oldTotal = booking.totalAmount;

  const newTicketCount = inputPositiveInteger("Nhập số vé mới:");
  if (newTicketCount === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  const newPrice = inputPositiveInteger("Nhập giá mỗi vé mới (VNĐ):");
  if (newPrice === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  const { totalAmount: newTotal } = calculateTotal(newTicketCount, newPrice);
  booking.ticketCount = newTicketCount;
  booking.pricePerTicket = newPrice;
  booking.totalAmount = newTotal;

  console.log(`Tổng thanh toán cũ: ${formatCurrency(oldTotal)} | Tổng thanh toán mới: ${formatCurrency(newTotal)}`);
  console.log("Cập nhật thành công");
}

function handleDeleteBooking() {
  const rawCode = prompt("Nhập mã đặt vé cần xóa:");
  if (rawCode === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }
  const bookingCode = rawCode.trim().toUpperCase();
  const index = findBookingIndex(bookingCode);
  if (index === -1) {
    console.log(`Không tìm thấy đơn đặt vé có mã ${bookingCode}`);
    return;
  }

  const confirmInput = prompt(`Bạn có chắc chắn muốn xóa đơn đặt vé ${bookingCode}? (Y/N):`);
  if (confirmInput === null || confirmInput.trim().toUpperCase() !== "Y") {
    console.log(`Đã hủy thao tác xóa, còn ${bookings.length} đơn`);
    return;
  }

  bookings.splice(index, 1);
  console.log(`Xóa thành công, còn ${bookings.length} đơn`);
}

function handleSearchBooking() {
  const keyword = prompt("Nhập từ khóa tìm kiếm theo tên phim:");
  if (keyword === null || keyword.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }
  const searchKey = keyword.trim().toLowerCase();
  const results = bookings.filter((b) => {
    return b.movieTitle.toLowerCase().includes(searchKey);
  });
  if (results.length === 0) {
    console.log("Không tìm thấy đơn đặt vé phù hợp");
    return;
  }
  displayBookings(results);
}

function handleExit() {
  console.log("==================================================");
  console.log("           BÁO CÁO TỔNG KẾT ĐƠN ĐẶT VÉ            ");
  console.log("==================================================");
  if (bookings.length === 0) {
    console.log("Chưa có đơn đặt vé nào");
  } else {
    const totalCount = bookings.length;
    let totalRevenue = 0;
    let highestBooking = bookings[0];

    for (let i = 0; i < bookings.length; i++) {
      const b = bookings[i];
      totalRevenue += b.totalAmount;
      if (b.totalAmount > highestBooking.totalAmount) {
        highestBooking = b;
      }
    }

    const avgRevenue = Math.round(totalRevenue / totalCount);

    console.log(`Tổng số đơn đặt vé   : ${totalCount}`);
    console.log(`Tổng doanh thu       : ${formatCurrency(totalRevenue)}`);
    console.log(`Doanh thu trung bình : ${formatCurrency(avgRevenue)}`);
    console.log(`Đơn cao nhất         : ${highestBooking.bookingCode} - ${formatCurrency(highestBooking.totalAmount)}`);
  }
  console.log("==================================================");
  console.log("Cảm ơn bạn đã sử dụng chương trình. Tạm biệt!");
}

function startApp() {
  const menuText = `=====================================================
     HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
=====================================================
1. Hiển thị danh sách đơn đặt vé
2. Thêm đơn đặt vé mới
3. Cập nhật đơn đặt vé
4. Xóa đơn đặt vé
5. Tìm kiếm đơn đặt vé theo tên phim
0. Thoát chương trình
=====================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):`;

  let isRunning = true;
  while (isRunning) {
    const choice = prompt(menuText);
    if (choice === null) {
      console.log("Lựa chọn không hợp lệ, vui lòng chọn lại (0 - 5)!");
      continue;
    }
    const trimmedChoice = choice.trim();
    switch (trimmedChoice) {
      case "1": {
        handleDisplayBookings();
        break;
      }
      case "2": {
        handleAddBooking();
        break;
      }
      case "3": {
        handleUpdateBooking();
        break;
      }
      case "4": {
        handleDeleteBooking();
        break;
      }
      case "5": {
        handleSearchBooking();
        break;
      }
      case "0": {
        handleExit();
        isRunning = false;
        break;
      }
      default: {
        console.log("Lựa chọn không hợp lệ, vui lòng chọn lại (0 - 5)!");
        break;
      }
    }
  }
}

startApp();
