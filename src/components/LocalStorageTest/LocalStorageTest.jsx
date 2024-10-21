import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';

const LocalStorageTest = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('testData') || '';
    setData(savedData);
    console.log('Завантажено з localStorage:', savedData);
  }, []);

  const saveData = () => {
    localStorage.setItem('testData', 'Тестове значення');
    setData('Тестове значення');
    console.log('Збережено в localStorage: Тестове значення');
  };

  const clearData = () => {
    localStorage.removeItem('testData');
    setData('');
    console.log('Видалено з localStorage: testData');
  };

  return (
    <div>
      <h2>LocalStorage Test</h2>
      <p>Data: {data}</p>
      <Button classNames="primary" onClick={saveData}>
        Зберегти дані
      </Button>
      <Button classNames="secondary" onClick={clearData}>
        Очистити дані
      </Button>
    </div>
  );
};

export default LocalStorageTest;
