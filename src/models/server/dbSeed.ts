// import { db } from '@/models/name';
// import createAnswerCollection from '@/models/server/answer.collection';
// import createCommentCollection from '@/models/server/comment.collection';
// import createQuestionCollection from '@/models/server/question.collection';
// import createVoteCollection from '@/models/server/vote.collection';
// import { databases } from '@/models/server/config';

// export default async function getOrCreateDB() {
// 	try {
// 		await databases.get(db);
// 		console.log('😎 Database connected ✓');
// 	} catch (err) {
//         try {
//             await databases.create(db, db)
//             console.log('🟢 Database created ✓');
//             await Promise.all([
//                 createAnswerCollection(),
//                 createQuestionCollection(),
//                 createCommentCollection(),
//                 createVoteCollection(),
//             ])
//             console.log('🟢 Collections created ✓');
//             console.log('😎 Database connected ✓');
//         } catch (err) {
//             console.log('🔴 Error creating databases or collections: ', err);
//         }
//     }
//     return databases;
// }
