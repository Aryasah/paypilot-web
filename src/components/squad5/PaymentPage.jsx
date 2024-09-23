import React, { useState } from "react";
import "./PaymentPage.css";
import Header from "./Header";
import { motion } from "framer-motion";

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("netBanking");

  const handleNetBankingClick = () => setSelectedPaymentMethod("netBanking");
  const handleCreditCardClick = () => setSelectedPaymentMethod("creditCard ");
  const handleDebitCardClick = () => setSelectedPaymentMethod("debitCard");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="payment-page"
    >
      {/* <Header /> */}
      <div className="payment-container">
        {/* Payment Method List Group */}
        <div>
          <h2>Select payment method</h2>
          <div className="list-group">
            <button
              onClick={handleNetBankingClick}
              className={`list-group-item list-group-item-action ${
                selectedPaymentMethod === "netBanking" ? "active" : ""
              }`}
            >
              Net banking
            </button>
            <button
              onClick={handleCreditCardClick}
              className={`list-group-item list-group-item-action ${
                selectedPaymentMethod === "creditCard" ? "active" : ""
              }`}
            >
              Credit card
            </button>
            <button className={`list-group-item list-group-item-action ${
                selectedPaymentMethod === "debitCard" ? "active" : ""
              }`}
              onClick={handleDebitCardClick}>
              Debit card
            </button>
          </div>
        </div>

        {/* Right Section: Bank icons or Credit Card Form */}
        <div className="payment-section">
          {selectedPaymentMethod === "netBanking" && (
            <div>
              <h3>Select payment institution</h3>
              <div className="row">
                <div className="col-sm-6 col-md-4">
                  <div className="payment__page__card">
                    <img
                      src="/images/sbi.jpg"
                      className="card-img-top"
                      alt="State Bank of India"
                    />
                    <div className="card-body">
                      <p className="card-text">State Bank of India</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="payment__page__card">
                    <img
                      src="/images/bankofbaroda.png"
                      className="card-img-top"
                      alt="Bank of Baroda"
                    />
                    <div className="card-body">
                      <p className="card-text">Bank of Baroda</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="payment__page__card">
                    <img
                      src="/images/union.png"
                      className="card-img-top"
                      alt="Union Bank"
                    />
                    <div className="card-body">
                      <p className="card-text">Union Bank</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Bank Cards */}
              <div className="row">
                <div className="col-sm-6 col-md-3">
                  <div className="payment__page__card">
                    <img
                      src="/images/hdfc.png"
                      className="card-img-top"
                      alt="HDFC Bank"
                    />
                    <div className="card-body">
                      <p className="card-text">HDFC Bank</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="payment__page__card">
                    <img
                      src="/images/axis.png"
                      className="card-img-top"
                      alt="Axis Bank"
                    />
                    <div className="card-body">
                      <p className="card-text">Axis Bank</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="payment__page__card">
                    <img
                      src="/images/kotak.png"
                      className="card-img-top"
                      alt="Kotak Bank"
                    />
                    <div className="card-body">
                      <p className="card-text">Kotak Bank</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="payment__page__card">
                    <img
                      src="/images/icici.png"
                      className="card-img-top"
                      alt="ICICI Bank"
                    />
                    <div className="card-body">
                      <p className="card-text">ICICI Bank</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(selectedPaymentMethod === "creditCard" || selectedPaymentMethod === "debitCard") && (
            <div>
              <h3>Pay with card</h3>
              <form>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="dummy@gmail.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Card Information</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 1234 1234 1234"
                    style={{marginBottom: "10px"}}
                  />
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="DD/ MM / YY"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Name on card</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Country or region</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="India"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Pay
                </button>
              </form>
            </div>
          )}
          
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
