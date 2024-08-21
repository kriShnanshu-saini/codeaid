import QuestionCard from '@/components/QuestionCard';
import { answerCollection, db, questionCollection, voteCollection } from '@/models/name';
import { databases, users } from '@/models/server/config';
import { UserPrefs } from '@/store/Auth';
import { Query } from 'appwrite';
import React from 'react';

// prettier-ignore
const LatestQuestions = async () => {
    const questions = await databases.listDocuments(db, questionCollection, [
        Query.select([
            '$id',
            '$createdAt',
            'title',
            'content',
            'authorId',
            'tags',
            'attachmentId'
        ]),
        Query.limit(5),
        Query.orderDesc('$createdAt')
    ]);
    console.log('\n\n\n🚀 ~ LatestQuestions ~ Fetched questions:', questions.total);

	questions.documents = await Promise.all(
		questions.documents.map(async ques => {
			const [author, answers, votes] = await Promise.all([
				users.get<UserPrefs>(ques.authorId),
				databases.listDocuments(db, answerCollection, [
					Query.equal('questionId', ques.$id),
					Query.limit(1), // for optimization
				]),
				databases.listDocuments(db, voteCollection, [
					Query.equal('type', 'question'),
					Query.equal('typeId', ques.$id),
					Query.limit(1), // for optimization
				]),
			]);

			return {
				...ques,
				totalAnswers: answers.total,
				totalVotes: votes.total,
				author: {
					$id: author.$id,
					reputation: author.prefs.reputation,
					name: author.name,
				},
			};
		})
    );

	// console.log('\n\n\nLatest question: ', questions.documents[0].tags);
	return (
		<div className='space-y-6'>
			<h2 className='ml-2 text-lg'>Latest Questions</h2>
			{questions.documents.map(question => (
				<QuestionCard
					key={question.$id}
					ques={question}
				/>
			))}
		</div>
	);
};

export default LatestQuestions;
