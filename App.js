// App.js
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState(""); // URL 입력 상태
  const [result, setResult] = useState(""); // ChatGPT 응답 상태
  const [error, setError] = useState(""); // 에러 메시지 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [showResponse, setShowResponse] = useState(false); // 제시방법 박스 애니메이션 제어

  // 폼 제출을 처리하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 에러와 결과 상태 초기화
    setError("");
    setResult("");
    setShowResponse(false); // 이전 응답 애니메이션 리셋

    // URL 검증
    if (!url) {
      setError("URL을 입력해주세요.");
      return;
    }

    try {
      setLoading(true); // 로딩 시작

      // Mocking the API response
      setTimeout(() => {
        setResult("이것은 테스트 응답입니다."); // Mock response
        setShowResponse(true); // 애니메이션 트리거
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.detail || "오류가 발생했습니다. 다시 시도해주세요."); // 에러 메시지 처리
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="container">
      <h1 className="url-box pop-out">
        URL BOX
      </h1>
      
      {/* URL 제출 폼 */}
      <form onSubmit={handleSubmit} className="url-form">
        <input
          type="text"
          value={url}
          placeholder="웹사이트 URL을 입력하세요"
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? "제출 중..." : "제출"}
        </button>
      </form>

      {/* 에러 메시지 */}
      {error && <p className="error-message">{error}</p>}

      {/* 로딩 인디케이터 */}
      {loading && <p className="loading-message">로딩 중...</p>}

      {/* ChatGPT 응답 */}
      {!loading && result && (
        <div className={`response-box ${showResponse ? 'response-pop-out' : ''}`}>
          <h3>풀이방법:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
