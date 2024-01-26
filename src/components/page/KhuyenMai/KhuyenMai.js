import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPromoMessage,selectPromoMessage } from '../../../store/slice/PromotionReducer';

const Promotion = () => {
  const dispatch = useDispatch();
  const promoMessage = useSelector(selectPromoMessage);
  const [newPromoMessage, setNewPromoMessage] = useState('');

  const handleSetPromoMessage = () => {
    dispatch(setPromoMessage(newPromoMessage));
  };

  return (
    <div>
      <h2>Promo Screen</h2>
      <p>{promoMessage}</p>
      <input
        type="text"
        value={newPromoMessage}
        onChange={(e) => setNewPromoMessage(e.target.value)}
      />
      <button onClick={handleSetPromoMessage}>Set Promo Message</button>
    </div>
  );
};

export default Promotion;