import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestbookForm from './components/GuestbookForm';
import GuestbookList from './components/GuestbookList';
import './App.css';

function App() {
  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4">방명록</h1>
        <p className="lead">방문자 여러분의 메시지를 남겨주세요</p>
      </header>
      
      <div className="row">
        <div className="col-md-5 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">새 메시지 작성</h5>
            </div>
            <div className="card-body">
              <GuestbookForm />
            </div>
          </div>
        </div>
        
        <div className="col-md-7">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">방명록 메시지</h5>
            </div>
            <div className="card-body">
              <GuestbookList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
