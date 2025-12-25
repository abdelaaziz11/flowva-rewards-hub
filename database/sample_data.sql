INSERT INTO rewards (name, description, cost, icon, category) VALUES
('$5 Bank Transfer', 'The $5 equivalent will be transferred to your bank account.', 5000, '💸', 'cash'),
('$5 PayPal International', 'Receive a $5 PayPal balance transfer directly to your PayPal account email.', 5000, '💸', 'cash'),
('$5 Virtual Visa Card', 'Use your $5 prepaid card to shop anywhere Visa is accepted online.', 5000, '🎁', 'gift_card'),
('$10 Amazon Gift Card', 'Redeem for Amazon shopping credit.', 8000, '🎁', 'gift_card'),
('$15 Premium Upgrade', 'Unlock premium features for 1 month.', 12000, '⭐', 'subscription'),
('$25 Store Credit', 'Use credit on any Flowva store purchase.', 20000, '🎁', 'store_credit')
ON CONFLICT DO NOTHING;

