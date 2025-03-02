import React from 'react';
import headImg from '../assets/Rectangle 12.png'

export default function Header() {
    return (
        <head
        className="navbar navbar-expand-lg navbar-light"
        style={{
          backgroundImage: `url(${headImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '120px',
          width: '100%' // اضافه کردن این خط برای تنظیم عرض کامل
        }}
      >
        <h1
          style={{
            color: 'white',
            fontSize: '45px',
            textAlign: 'center',
            width: '100%' // اضافه کردن این خط برای اطمینان از اینکه h1 به عرض کامل صفحه می‌رسد
          }}
        >
          Artevivo
        </h1>
      </head>
      
    );
}