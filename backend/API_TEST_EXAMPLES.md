# Backend API Test Examples

Start the backend before trying these examples:

```bash
npm run dev
```

The API uses `http://localhost:3001`.

## Get All Players

```bash
curl http://localhost:3001/api/players
```

Expected result: status `200` and an array of players.

## Add a Player

```bash
curl -X POST http://localhost:3001/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Milan Nikolic",
    "age": 17,
    "position": "Forward",
    "attendancePercentage": 91,
    "fitnessScore": 8.2,
    "status": "Active"
  }'
```

Expected result: status `201` and the new player with a generated `id`.

## Update a Player

Replace `PLAYER_ID` with an existing player ID:

```bash
curl -X PUT http://localhost:3001/api/players/PLAYER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Milan Nikolic",
    "age": 17,
    "position": "Forward",
    "attendancePercentage": 82,
    "fitnessScore": 7.8,
    "status": "Active"
  }'
```

Expected result: status `200` and the updated player.

## Delete a Player

```bash
curl -X DELETE http://localhost:3001/api/players/PLAYER_ID
```

Expected result: status `204` with no response body.

## Get Rule-Based Insights

```bash
curl http://localhost:3001/api/insights
```

Expected result: status `200` and recommendations for every player.

## Test Validation

```bash
curl -X POST http://localhost:3001/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "age": 3,
    "position": "Coach",
    "attendancePercentage": 120,
    "fitnessScore": 15,
    "status": "Unknown"
  }'
```

Expected result: status `400` with a list of validation errors.

## Repeat All Checks

Run the included test script:

```bash
npm run test:api
```

The script tests all required endpoints and restores `players.json` afterward.
