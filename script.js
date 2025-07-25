function calculate() {
  const rent = parseFloat(document.getElementById('rent').value || 0);
  const parking = parseFloat(document.getElementById('parking').value || 0);

  const elecPrev = parseFloat(document.getElementById('elecPrev').value || 0);
  const elecCurr = parseFloat(document.getElementById('elecCurr').value || 0);
  const elecUsed = elecCurr - elecPrev;
  const elecRate = parseFloat(document.getElementById('elecRate').value || 0);
  const elecTotal = elecUsed >= 0 ? elecUsed * elecRate : 0;

  const waterPrev = parseFloat(document.getElementById('waterPrev').value || 0);
  const waterCurr = parseFloat(document.getElementById('waterCurr').value || 0);
  const waterUsed = waterCurr - waterPrev;
  const waterRate = parseFloat(document.getElementById('waterRate').value || 0);
  const waterTotal = waterUsed >= 0 ? waterUsed * waterRate : 0;

  const total = rent + parking + elecTotal + waterTotal;

  document.getElementById('result').innerHTML = `
    <b>📋 ใบสรุปรายการ</b><br><br>
    ค่าเช่าห้อง: ${rent.toLocaleString()} บาท<br>
    ${parking > 0 ? `ค่าจอดรถ: ${parking.toLocaleString()} บาท<br>` : ""}
    ค่าไฟ (${elecUsed} หน่วย): ${elecTotal.toLocaleString()} บาท<br>
    ค่าน้ำ (${waterUsed} หน่วย): ${waterTotal.toLocaleString()} บาท<br><br>
    <b>💰 รวมทั้งสิ้น: ${total.toLocaleString()} บาท</b>
  `;
}

function submitToSheet() {
  const data = {
    room: document.getElementById('room').value,
    tenant: document.getElementById('tenant').value,
    rent: parseFloat(document.getElementById('rent').value || 0),
    parking: parseFloat(document.getElementById('parking').value || 0),

    elecPrev: parseFloat(document.getElementById('elecPrev').value || 0),
    elecCurr: parseFloat(document.getElementById('elecCurr').value || 0),
    elecUsed: elecCurr - elecPrev,
    elecTotal: (elecCurr - elecPrev) * parseFloat(document.getElementById('elecRate').value || 0),

    waterPrev: parseFloat(document.getElementById('waterPrev').value || 0),
    waterCurr: parseFloat(document.getElementById('waterCurr').value || 0),
    waterUsed: waterCurr - waterPrev,
    waterTotal: (waterCurr - waterPrev) * parseFloat(document.getElementById('waterRate').value || 0)
  };

  data.total = data.rent + data.parking + data.elecTotal + data.waterTotal;

  fetch("https://script.google.com/macros/s/AKfycby512z47ILyu-AiJ41PUtZ0K7UDnovTS6TrXWOnYjuUABDwqGUDPu5_Nd4-RNXhxe6SnQ/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(res => {
    alert("✅ ส่งข้อมูลสำเร็จ!");
  })
  .catch(err => {
    alert("❌ ส่งข้อมูลไม่สำเร็จ");
    console.error(err);
  });
}
