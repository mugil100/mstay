require('dotenv').config();
const mongoose = require('mongoose');

// Import all models
const User = require('./models/User');
const StudentProfile = require('./models/StudentProfile');
const Neighborhood = require('./models/Neighborhood');
const PgListing = require('./models/PgListing');
const PgRoom = require('./models/PgRoom');
const PgAvailability = require('./models/PgAvailability');
const VisitBooking = require('./models/VisitBooking');
const PgReview = require('./models/PgReview');
const Favorite = require('./models/Favorite');
const RoommatePreference = require('./models/RoommatePreference');
const RoommateMatch = require('./models/RoommateMatch');
const Notification = require('./models/Notification');
const Complaint = require('./models/Complaint');
const RecommendationLog = require('./models/RecommendationLog');

const seedDB = async () => {
    try {
        // 1. Connect to MongoDB Atlas
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        // 2. Drop existing database
        console.log('Dropping existing database...');
        await mongoose.connection.dropDatabase();
        console.log('Database dropped.');

        // 3. Insert Users
        console.log('Inserting Users...');
        const users = await User.insertMany([
            { name: 'Admin User', email: 'admin@test.com', password: 'password123', role: 'admin' },
            { name: 'PG Owner 1', email: 'owner1@test.com', password: 'password123', role: 'owner', phone: '9876543210' },
            { name: 'PG Owner 2', email: 'owner2@test.com', password: 'password123', role: 'owner', phone: '8765432109' },
            { name: 'Student 1', email: 'student1@test.com', password: 'password123', role: 'student', phone: '7654321098' },
            { name: 'Student 2', email: 'student2@test.com', password: 'password123', role: 'student', phone: '6543210987' },
        ]);

        const owner1Id = users[1]._id;
        const owner2Id = users[2]._id;
        const student1Id = users[3]._id;
        const student2Id = users[4]._id;

        // 4. Insert Student Profiles
        console.log('Inserting Student Profiles...');
        await StudentProfile.insertMany([
            { userId: student1Id, college: 'Engineering College', gender: 'Male', budget: 8000, preferredRoomType: 'Double', foodPreference: 'Veg' },
            { userId: student2Id, college: 'Arts College', gender: 'Female', budget: 12000, preferredRoomType: 'Single', foodPreference: 'Any' },
        ]);

        // 5. Insert Neighborhoods
        console.log('Inserting Neighborhoods...');
        const neighborhoods = await Neighborhood.insertMany([
            { locationName: 'Anna Nagar', city: 'Chennai', safetyScore: 9, transportScore: 8, averageRent: 12000, nearbyColleges: ['Anna University'] },
            { locationName: 'Tambaram', city: 'Chennai', safetyScore: 7, transportScore: 9, averageRent: 7000, nearbyColleges: ['Madras Christian College'] },
        ]);

        const annaNagarId = neighborhoods[0]._id;
        const tambaramId = neighborhoods[1]._id;

        // 6. Insert PG Listings
        console.log('Inserting PG Listings...');
        const pgs = await PgListing.insertMany([
            {
                pgName: 'Sunrise PG', address: '123 Main St, Anna Nagar', location: 'Anna Nagar', neighborhoodId: annaNagarId, ownerId: owner1Id, rent: 10000, genderPreference: 'Boys',
                amenities: { wifi: true, food: true, laundry: false, parking: true, powerBackup: true, cctv: true, gym: false, studyRoom: true },
                ratingAverage: 4.5, totalReviews: 12, images: ['https://via.placeholder.com/300']
            },
            {
                pgName: 'Moonlight Hostel', address: '456 Cross St, Tambaram', location: 'Tambaram', neighborhoodId: tambaramId, ownerId: owner2Id, rent: 7500, genderPreference: 'Girls',
                amenities: { wifi: true, food: true, laundry: true, parking: false, powerBackup: true, cctv: true, gym: true, studyRoom: true },
                ratingAverage: 4.8, totalReviews: 24, images: ['https://via.placeholder.com/300']
            },
        ]);

        const pg1Id = pgs[0]._id;
        const pg2Id = pgs[1]._id;

        // 7. Insert PG Rooms
        console.log('Inserting PG Rooms...');
        const rooms = await PgRoom.insertMany([
            { pgId: pg1Id, roomType: 'Single', sharingCapacity: 1, totalBeds: 5, roomRent: 12000, acAvailable: true },
            { pgId: pg1Id, roomType: 'Double', sharingCapacity: 2, totalBeds: 10, roomRent: 8000, acAvailable: false },
            { pgId: pg2Id, roomType: 'Triple', sharingCapacity: 3, totalBeds: 15, roomRent: 6000, acAvailable: true },
        ]);

        // 8. Insert PG Availability
        console.log('Inserting PG Availability...');
        await PgAvailability.insertMany([
            { roomId: rooms[0]._id, availableBeds: 2, status: 'Limited' },
            { roomId: rooms[1]._id, availableBeds: 0, status: 'Full' },
            { roomId: rooms[2]._id, availableBeds: 10, status: 'Available' },
        ]);

        // 9. Insert Visit Bookings
        console.log('Inserting Visit Bookings...');
        await VisitBooking.insertMany([
            { studentId: student1Id, pgId: pg1Id, roomId: rooms[0]._id, visitDate: new Date(+new Date() + 1 * 24 * 60 * 60 * 1000), status: 'Pending' },
            { studentId: student2Id, pgId: pg2Id, roomId: rooms[2]._id, visitDate: new Date(+new Date() + 2 * 24 * 60 * 60 * 1000), status: 'Approved' },
        ]);

        // 10. Insert PG Reviews
        console.log('Inserting PG Reviews...');
        await PgReview.insertMany([
            { pgId: pg1Id, studentId: student1Id, rating: 4, reviewText: 'Good food, but AC cuts off sometimes.', sentimentScore: 0.6 },
            { pgId: pg2Id, studentId: student2Id, rating: 5, reviewText: 'Very safe and clean environment!', sentimentScore: 0.9 },
        ]);

        // 11. Insert Favorites
        console.log('Inserting Favorites...');
        await Favorite.insertMany([
            { studentId: student1Id, pgId: pg1Id },
            { studentId: student2Id, pgId: pg2Id },
        ]);

        // 12. Insert Roommate Preferences
        console.log('Inserting Roommate Preferences...');
        await RoommatePreference.insertMany([
            { studentId: student1Id, sleepTime: '11:00 PM', cleanlinessLevel: 'High', smoking: false, studyHabits: 'Quiet', budget: 8000 },
            { studentId: student2Id, sleepTime: '10:00 PM', cleanlinessLevel: 'Medium', smoking: false, studyHabits: 'Group', budget: 12000 },
        ]);

        // 13. Insert Roommate Matches
        console.log('Inserting Roommate Matches...');
        await RoommateMatch.insertMany([
            { studentA: student1Id, studentB: student2Id, compatibilityScore: 78, status: 'Pending' }
        ]);

        // 14. Insert Notifications
        console.log('Inserting Notifications...');
        await Notification.insertMany([
            { userId: owner1Id, message: 'You have a new visit request.', type: 'VisitBooking' },
            { userId: student1Id, message: 'Your customized PG recommendations are ready.', type: 'Recommendation' }
        ]);

        // 15. Insert Complaints
        console.log('Inserting Complaints...');
        await Complaint.insertMany([
            { studentId: student1Id, pgId: pg1Id, complaintText: 'WiFi is extremely slow today.', status: 'Open' }
        ]);

        // 16. Insert Recommendation Logs
        console.log('Inserting Recommendation Logs...');
        await RecommendationLog.insertMany([
            { studentId: student1Id, recommendedPgIds: [pg1Id], algorithmVersion: 'v1.0.0' }
        ]);

        console.log('✅ SEEDING COMPLETE! Successfully inserted dummy data into all 14 collections.');

    } catch (error) {
        console.error('❌ SEEDING FAILED:', error);
    } finally {
        // Close connection
        mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);
    }
};

seedDB();
