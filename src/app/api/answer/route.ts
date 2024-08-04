import { answerCollection, db } from '@/models/name';
import { databases, users } from '@/models/server/config';
import { NextRequest, NextResponse } from 'next/server';
import { ID } from 'node-appwrite';

import { UserPrefs } from '@/store/Auth';

export async function POST(request: NextRequest) {
	try {
		const { answer, questionId, authorId } = await request.json();
		const response = await databases.createDocument(db, answerCollection, ID.unique(), {
			content: answer,
			authorId,
			questionId,
		});

		// increase author reputation
		const prefs = await users.getPrefs<UserPrefs>(authorId);
		await users.updatePrefs(authorId, { reputation: Number(prefs.reputation) + 1 });
		return NextResponse.json(response, {
			status: 201,
		});
	} catch (err: any) {
		return NextResponse.json(
			{
				error: err?.message || 'Error creating an answer',
			},
			{ status: err?.status || err?.code || 500 }
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { answerId } = await request.json();
		const answer = await databases.getDocument(db, answerCollection, answerId);
		if (!answer) return NextResponse.json({ error: 'No answer found' }, { status: 404 });
		const response = await databases.deleteDocument(db, answerCollection, answerId);

		// dec prefs
		const prefs = await users.getPrefs<UserPrefs>(answer.authorId);
		await users.updatePrefs(answer.authorId, { reputation: Number(prefs.reputation - 1) });
		return NextResponse.json(
            { data: response }, 
            { status: 200 }
        );
	} catch (err: any) {
		return NextResponse.json(
			{
				error: err?.message || 'Error deleting an answer',
			},
			{ status: err?.status || err?.code || 500 }
		);
	}
}
