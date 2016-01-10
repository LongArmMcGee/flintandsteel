/* global describe */
/* global module */
/* global beforeEach */
/* global inject */
/* global it */
/* global expect */
/* global moment */

describe('ideaSvc', function() {
    "use strict";

    var ideaSvc, $httpBackend, dummyIdea;

    beforeEach(module('flintAndSteel'));

    beforeEach(inject(function(_ideaSvc_, _$httpBackend_) {
        ideaSvc = _ideaSvc_;
        $httpBackend = _$httpBackend_;

        dummyIdea = {
            _id: 0,
            title: 'Test title',
            author: 'Guybrush Threepwood',
            description: 'Test description',
            likes: 45,
            comments: [
                {
                    text: 'Yeah, mhm.',
                    name: 'Dude',
                    time: moment().subtract(4, 'days').calendar()
                }
            ],
            backs: [
                {
                    text: 'Some resources',
                    name: 'Some Guy',
                    time: moment().calendar(),
                    types: [
                        { name: 'Experience' },
                        { name: 'Knowledge' }
                    ]
                }
            ]
        };
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should exist', function() {
        expect(ideaSvc).toBeDefined();
    });

    describe('ideaSvc.postIdea', function() {
        var postIdeaHandler;

        beforeEach(function() {
            postIdeaHandler = $httpBackend.whenPOST('/idea')
                                .respond(201, 'Created');
        });

        it('should add a newly submitted idea', function() {
            $httpBackend.expectPOST('/idea', dummyIdea);

            ideaSvc.postIdea(dummyIdea, function(data) {
                expect(data).toBe('Created');
            }, function() { });

            $httpBackend.flush();
        });
    });

    describe('ideaSvc.getIdea', function() {
        var getIdeaHandler;

        beforeEach(function() {
            getIdeaHandler = $httpBackend.whenGET('/idea?id=9001')
                                .respond(200, dummyIdea);
        });

        it('it should return an idea when provided an idea', function() {
            $httpBackend.expectGET('/idea?id=9001');

            ideaSvc.getIdea(9001, function() { }, function() { });

            $httpBackend.flush();
        });

    });

    describe('ideaSvc.getIdeaHeaders', function() {
        var getIdeaHeadersHandler, dummyHeaders;

        beforeEach(function() {
            dummyHeaders = [
                {
                    id: 'mock_idea',
                    name: 'The Bestest Idea Ever',
                    author: 'Yash Kulshrestha',
                    likes: 23
                }
            ];
            getIdeaHeadersHandler = $httpBackend.whenGET('/ideaheaders')
                                        .respond(200, dummyHeaders);
        });

        it('should return idea headers', function() {
            $httpBackend.expectGET('/ideaheaders');

            ideaSvc.getIdeaHeaders(function() { }, function() { });

            $httpBackend.flush();
        });
    });

    describe('ideaSvc.updateIdea', function() {
        var updateIdeaHandler, updatedIdea;

        beforeEach(function() {
            updatedIdea = {
                id: 'dummy_idea',
                property: 'likes',
                value: 24
            };
            updateIdeaHandler = $httpBackend.whenPOST('/updateidea', updatedIdea).respond(200, 'OK');
        });

        it('should update the idea with new passed in information', function() {
            $httpBackend.expectPOST('/updateidea', updatedIdea);

            ideaSvc.updateIdea('dummy_idea', 'likes', 24, function() { }, function() { });

            $httpBackend.flush();
        });
    });

    describe('ideaSvc.getBackTypeChips', function() {
        var backTypes;

        it('should return the back types with lowercase property', function() {
            backTypes = ideaSvc.getBackTypeChips();

            expect(backTypes).toBeDefined();
            expect(backTypes[0].name).toBe('Experience');
            expect(backTypes[0]._lowername).toBe('experience');
        });
    });

    describe('ideaSvc.deleteIdea', function() {
        var deletedIdea, updateIdeaHandler;

        beforeEach(function() {
            deletedIdea = {
                id: 'dummy_idea'
            };
            updateIdeaHandler = $httpBackend.whenPOST('/deleteidea', deletedIdea).respond(200, 'OK');
        });

        it('should delete the idea', function() {
            $httpBackend.expectPOST('/deleteidea', deletedIdea);

            ideaSvc.deleteIdea('dummy_idea', function() { }, function() { });

            $httpBackend.flush();
        });
    });

    describe('ideaSvc.postComment', function() {
        var postCommentHandler, dummyComment;

        beforeEach(function() {
            postCommentHandler = $httpBackend.whenPOST('/comment')
                                .respond(201, 'Created');

            dummyComment = {
                parentId: dummyIdea._id,
                text: "This is a test comment",
                authorId: 1
            };
        });

        it('should add a newly submitted comment', function() {
            $httpBackend.expectPOST('/comment', dummyComment);

            ideaSvc.postComment(dummyComment.parentId, dummyComment.text, dummyComment.authorId, function(data) {
                expect(data).toBe('Created');
            }, function() { });

            $httpBackend.flush();
        });
    });

    describe('ideaSvc.deleteComment', function() {
        var deletedComment, updateCommentHandler;

        beforeEach(function() {
            deletedComment = {
                commentId: 'dummy_comment'
            };
            updateCommentHandler = $httpBackend.whenPOST('/deleteComment', deletedComment.id).respond(200, 'OK');
        });

        it('should delete the comment', function() {
            $httpBackend.expectPOST('/deleteComment', deletedComment.id);

            ideaSvc.deleteComment(deletedComment.id, function() { }, function() { });

            $httpBackend.flush();
        });
    });

    describe('ideaSvc.addInteraction', function() {
        var addInteractionHandler, dummyInteraction;

        beforeEach(function() {
            addInteractionHandler = $httpBackend.whenPOST('/idea/addinteraction')
                                .respond(201, 'Created');

            dummyInteraction = {
                id: dummyIdea._id,
                interactionType: "likes",
                interactionObject: {userId: 1}
            };
        });

        it('should add a new interaction', function() {
            $httpBackend.expectPOST('/idea/addinteraction', dummyInteraction);

            ideaSvc.addInteraction(dummyIdea._id, dummyInteraction.interactionType, dummyInteraction.interactionObject, function(data) {
                expect(data).toBe('Created');
            }, function() { });

            $httpBackend.flush();
        });
    });

    describe('ideaSvc.removeInteraction', function() {
        var removeInteractionHandler, dummyInteraction;

        beforeEach(function() {
            removeInteractionHandler = $httpBackend.whenPOST('/idea/removeinteraction')
                                .respond(200, 'OK');

            dummyInteraction = {
                id: dummyIdea._id,
                interactionType: "likes",
                interactionObject: {userId: 1}
            };
        });

        it('should remove an existing interaction', function() {
            $httpBackend.expectPOST('/idea/removeinteraction', dummyInteraction);

            ideaSvc.removeInteraction(dummyIdea._id, dummyInteraction.interactionType, dummyInteraction.interactionObject, function(data) {
                expect(data).toBe('OK');
            }, function() { });

            $httpBackend.flush();
        });
    });

    describe('ideaSvc.editBack', function() {
        var editBackHandler, dummyBack;

        beforeEach(function() {
            editBackHandler = $httpBackend.whenPOST('/idea/editback')
                                .respond(200, 'OK');

            dummyBack = {
                id: dummyIdea._id,
                authorId: 1,
                new: {
                    text: 'Just Experience',
                    name: 'Some Guy',
                    time: moment().calendar(),
                    types: [
                        { name: 'Experience' }
                    ]
                }
            };
        });

        it('should edit an existing back', function() {
            $httpBackend.expectPOST('/idea/editback', dummyBack);

            ideaSvc.editBack(dummyIdea._id, dummyBack.authorId, dummyBack.new, function(data) {
                expect(data).toBe('OK');
            }, function() { });

            $httpBackend.flush();
        });
    });

    describe('ideaSvc.editIdea', function() {
        var editIdeaHandler, smallDummyIdea;

        beforeEach(function() {
            editIdeaHandler = $httpBackend.whenPOST('/editidea')
                                .respond(200, 'OK');
            smallDummyIdea = {
                id: dummyIdea._id,
                title: dummyIdea.title,
                description: dummyIdea.description,
                tags: dummyIdea.tags,
                rolesreq: dummyIdea.rolesreq
            };
        });

        it('should edit an existing idea', function() {
            $httpBackend.expectPOST('/editidea', smallDummyIdea);

            ideaSvc.editIdea(dummyIdea._id, dummyIdea.title, dummyIdea.description, dummyIdea.tags, dummyIdea.rolesreq, function(data) {
                expect(data).toBe('OK');
            }, function() { });

            $httpBackend.flush();
        });
    });

});
