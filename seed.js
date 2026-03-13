import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAFLdHeztwXeeUT4hbG1ymiOcqlhipX9Jo",
    databaseURL: "https://giavinh123-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "giavinh123",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const initialRecords = [
    { carName: "Honda SH 150i", date: "10/03/2026" },
    { carName: "Yamaha Exciter 155", date: "05/03/2026" },
    { carName: "Toyota Camry", date: "01/03/2026" },
    { carName: "Mazda CX-5", date: "25/02/2026" }
];

async function seed() {
    console.log("Đang tạo dữ liệu thay nhớt...");
    const ref_node = ref(db, 'oil_changes');

    for (const record of initialRecords) {
        try {
            const newRef = push(ref_node);
            await set(newRef, record);
            console.log(`Đã thêm: ${record.carName}`);
        } catch (e) {
            console.error(e);
        }
    }
    console.log("Xong!");
    process.exit(0);
}

seed();
