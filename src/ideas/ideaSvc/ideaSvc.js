/* global angular */

angular.module('flintAndSteel')
.factory('ideaSvc',
    [
        '$http',
        function($http) {
            "use strict";

            this.postIdea = function postIdea(idea, successCb, errorCb) {
                $http.post('/idea', idea)
                    .success(successCb)
                    .error(errorCb);
            };

            this.getIdea = function getIdea(ideaId, successCb, errorCb) {
                $http.get('/idea?id=' + ideaId)
                    .success(successCb)
                    .error(errorCb);
            };

            this.getIdeaHeaders = function getIdeaHeaders(successCb, errorCb) {
                $http.get('/ideaheaders')
                    .success(successCb)
                    .error(errorCb);
            };

            this.postComment = function postComment(parentId, text, authorId, successCb, errorCb) {
                $http.post('/comment',
                        {
                            parentId: parentId,
                            text: text,
                            authorId: authorId
                        }
                    )
                    .success(successCb)
                    .error(errorCb);
            };

            this.deleteComment = function deleteComment(commentId, successCb, errorCb) {
                $http.post('/deleteComment',
                      {
                          commentId: commentId
                      }
                  )
                  .success(successCb)
                  .error(errorCb);
            };

            this.updateIdea = function updateIdea(ideaId, property, data, successCb, errorCb) {
                if (ideaId !== 'mock_idea') {
                    $http.post('/updateidea',
                            {
                                id: ideaId,
                                property: property,
                                value: data
                            }
                        )
                        .success(successCb)
                        .error(errorCb);
                }
            };

            this.likeIdea = function likeIdea(ideaId, userId, successCb, errorCb) {
                if (ideaId !== 'mock_idea') {
                    $http.post('/idea/like',
                            {
                                id: ideaId,
                                userId: userId
                            }
                        )
                        .success(successCb)
                        .error(errorCb);
                }
            };

            this.unlikeIdea = function unlikeIdea(ideaId, userId, successCb, errorCb) {
                if (ideaId !== 'mock_idea') {
                    $http.post('/idea/unlike',
                            {
                                id: ideaId,
                                userId: userId
                            }
                        )
                        .success(successCb)
                        .error(errorCb);
                }
            };

            this.backIdea = function backIdea(ideaId, backObj, successCb, errorCb) {
                if (ideaId !== 'mock_idea') {
                    $http.post('/idea/back',
                            {
                                id: ideaId,
                                backObj: backObj
                            }
                        )
                        .success(successCb)
                        .error(errorCb);
                }
            };

            this.unbackIdea = function unbackIdea(ideaId, backObj, successCb, errorCb) {
                if (ideaId !== 'mock_idea') {
                    $http.post('/idea/unback',
                            {
                                id: ideaId,
                                backObj: backObj
                            }
                        )
                        .success(successCb)
                        .error(errorCb);
                }
            };

            this.postUpdate = function postUpdate(ideaId, updateObj, successCb, errorCb) {
                if (ideaId !== 'mock_idea') {
                    $http.post('/idea/postupdate',
                            {
                                id: ideaId,
                                updateObj: updateObj
                            }
                        )
                        .success(successCb)
                        .error(errorCb);
                }
            };

            this.deleteUpdate = function deleteUpdate(ideaId, updateObj, successCb, errorCb) {
                if (ideaId !== 'mock_idea') {
                    $http.post('/idea/deleteupdate',
                            {
                                id: ideaId,
                                updateObj: updateObj
                            }
                        )
                        .success(successCb)
                        .error(errorCb);
                }
            };

            this.editIdea = function editIdea(ideaId, title, description, rolesreq, successCb, errorCb) {
                if (ideaId !== 'mock_idea') {
                    $http.post('/editidea',
                            {
                                id: ideaId,
                                title: title,
                                description: description,
                                rolesreq: rolesreq
                            }
                        )
                        .success(successCb)
                        .error(errorCb);
                }
            };

            this.deleteIdea = function deleteIdea(ideaId, successCb, errorCb) {
                if (ideaId !== 'mock_idea') {
                    $http.post('/deleteidea',
                            { id: ideaId }
                        )
                        .success(successCb)
                        .error(errorCb);
                }
            };

            this.getBackTypeChips = function getBackTypeChips() {
                var types = [
                    { name: 'Experience' },
                    { name: 'Funding' },
                    { name: 'Time' },
                    { name: 'Knowledge' },
                    { name: 'Social Network'},
                    { name: 'Materials' },
                    { name: 'How can I help?' }
                ];
                return types.map(function(type) {
                    //Lowercase '-' separated backing types for css classes
                    type._lowername = type.name.toLowerCase().replace(/[ ]/g, '-').replace('?', '');
                    return type;
                });
            };

            return {
                postIdea: this.postIdea,
                getIdea: this.getIdea,
                getIdeaHeaders: this.getIdeaHeaders,
                postComment: this.postComment,
                deleteComment: this.deleteComment,
                updateIdea: this.updateIdea,
                likeIdea: this.likeIdea,
                unlikeIdea: this.unlikeIdea,
                backIdea: this.backIdea,
                unbackIdea: this.unbackIdea,
                postUpdate: this.postUpdate,
                deleteUpdate: this.deleteUpdate,
                editIdea: this.editIdea,
                deleteIdea: this.deleteIdea,
                getBackTypeChips: this.getBackTypeChips
            };
        }
    ]
);
