INSERT INTO users (
    name,
    role,
    user_name,
    email,
    password,
    phone,
    age,
    dpi_number,
    complete_paperwork_path,
    photo_path,
    gender,
    marital_status,
    signature_path,
    second_password_hash,
    second_password_updated_at,
    created_at
) VALUES
(
    'Juan Pérez',
    'Cajero',
    'juanperez',
    'juan.perez@example.com',
    '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
    '5551234567',
    30,
    '1234567890123',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/stationery/test.pdf',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/photography/test_men.jpg',
    'Masculino',
    'Soltero',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/signature/test.png',
    NULL,
    NULL,
    UNIX_TIMESTAMP()
),
(
    'Ana López',
    'Atención al Cliente',
    'analopez',
    'ana.lopez@example.com',
    '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
    '5559876543',
    28,
    '0987654321098',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/stationery/test.pdf',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/photography/test_woman.jpg',
    'Femenino',
    'Casado',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/signature/test.png',
    NULL,
    NULL,
    UNIX_TIMESTAMP()
),
(
    'Luis Rodríguez',
    'Supervisor',
    'luisrodriguez',
    'luis.rodriguez@example.com',
    '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
    '5556789012',
    40,
    '1234561234561',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/stationery/test.pdf',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/photography/test_men.jpg',
    'Masculino',
    'Casado',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/signature/test.png',
    '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
    UNIX_TIMESTAMP(),
    UNIX_TIMESTAMP()
),
(
    'María García',
    'Administrador de Sistemas',
    'mariagarcia',
    'maria.garcia@example.com',
    '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
    '5553456789',
    35,
    '0987610987610',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/stationery/test.pdf',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/photography/test_woman.jpg',
    'Femenino',
    'Divorciado',
    'https://money-bin-group2.s3.us-east-1.amazonaws.com/signature/test.png',
    '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK',
    UNIX_TIMESTAMP(),
    UNIX_TIMESTAMP()
);

INSERT INTO accounts (
        id,
        user_id,
        account_number,
        balance,
        created_at,
        update_balance_at
    )
VALUES (
        1,
        2,
        '1000000001',
        1500.00,
        1707357600,
        1707357600
    ),
    -- 2024-12-07 10:00:00 UTC
    (
        2,
        3,
        '1000000002',
        2500.00,
        1707361200,
        1707361200
    ),
    -- 2024-12-07 11:00:00 UTC
    (
        3,
        1,
        '1000000003',
        10000.00,
        1707364800,
        1707364800
    ),
    -- 2024-12-07 12:00:00 UTC
    (
        4,
        4,
        '1000000004',
        500.00,
        1707368400,
        1707368400
    ),
    -- 2024-12-07 13:00:00 UTC
    (
        5,
        5,
        '1000000005',
        8000.00,
        1707372000,
        1707372000
    );
INSERT INTO loans (
        id,
        account_id,
        total_amount,
        remaining_balance,
        state,
        created_at
    )
VALUES (1, 1, 5000.00, 2500.00, 'Sin Pagar', 1707375600),
    -- 2024-12-07 15:00:00 UTC
    (2, 2, 3000.00, 1000.00, 'Sin Pagar', 1707379200),
    -- 2024-12-07 16:00:00 UTC
    (3, 4, 2000.00, 500.00, 'Sin Pagar', 1707382800),
    -- 2024-12-07 17:00:00 UTC
    (4, 5, 10000.00, 7000.00, 'Sin Pagar', 1707386400);
-- 2024-12-07 18:00:0