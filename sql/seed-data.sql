INSERT INTO users (id, name) VALUES
 ('fb414ddc-6e3b-4859-bb45-56d7389a64ba', 'Adam'),
 ('0c7c7cd5-058a-4fa1-8d91-f5364757a11c', 'Barry'),
 ('48f135fb-d7fb-4f47-b5bf-8824d8b6e525', 'Cindy'),
 ('9be28a4a-77af-4b65-91f4-088d5c0cd76b', 'David'),
 ('74856012-7e1d-11ec-82de-062205c32318', 'Ezra');

INSERT INTO loan_applications (
  id, user_id,
  credit_score, monthly_debt,
  monthly_income, bankruptcies, delinquencies,
  vehicle_value, loan_amount) VALUES
 ('4f9cb346-9fc5-4c86-844c-b78459aba72f', 'fb414ddc-6e3b-4859-bb45-56d7389a64ba',
  802, 13000.00,
  20000.00, 0, 0,
  78000.00, 60000.00),
 ('35fc3dc7-7361-4190-8834-ccb9d222e2ea', '0c7c7cd5-058a-4fa1-8d91-f5364757a11c',
  765, 3000.00,
  12000.00, 0, 0,
  45000.00, 30000.00),
 ('1c6813a7-76a7-4c36-b3cf-b8b47c93d460', '48f135fb-d7fb-4f47-b5bf-8824d8b6e525',
  600, 1000.00,
  5000.00, 0, 2,
  40000.00, 45000.00),
 ('8e4ebafd-79d7-40a5-9371-7241be84ed77', '9be28a4a-77af-4b65-91f4-088d5c0cd76b',
  680, 2000.00,
  8000.00, 1, 1,
  52000.00, 50000.00),
 ('83cf9ed9-c46e-468c-b73d-70ccb75cbe8e', '74856012-7e1d-11ec-82de-062205c32318',
  720, 4000.00,
  10000.00, 0, 0,
  50000.00, 40000.00);
