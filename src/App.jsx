import React, { useState, useEffect } from 'react';
import { db, ref, onValue } from './firebase';

function App() {
  const [oilChanges, setOilChanges] = useState([]);

  useEffect(() => {
    const oilRef = ref(db, 'oil_changes');
    const unsubscribe = onValue(oilRef, (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.entries(data).map(([id, values]) => ({
        id,
        ...values
      })) : [];
      // Sort by date descending
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOilChanges(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Nhật Ký Thay Nhớt</h1>
        <p>Theo dõi thời gian bảo trì định kỳ</p>
      </header>

      <div className="record-list">
        {oilChanges.length > 0 ? (
          oilChanges.map(item => (
            <div key={item.id} className="record-card">
              <div className="car-name">{item.carName}</div>
              <div className="change-date">{item.date}</div>
            </div>
          ))
        ) : (
          <p className="empty-state">Đang tải dữ liệu bảo trì...</p>
        )}
      </div>
    </div>
  );
}

export default App;
