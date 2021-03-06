/* global describe */
/* global module */
/* global beforeEach */
/* global inject */
/* global it */
/* global expect */
/* global spyOn */

describe('AccountViewCtrl', function() {
    "use strict";

    var scope, ctrl, $state, toastSvc, userSvcMock, ideaSvcMock;

    beforeEach(module('flintAndSteel'));
    beforeEach(module('ui.router'));

    describe('visiting when not logged in', function() {
        beforeEach(inject(function($rootScope, $controller, _$state_, _toastSvc_, _userSvcMock_, _ideaSvcMock_) {
            scope = $rootScope.$new();
            $state = _$state_;
            toastSvc = _toastSvc_;
            userSvcMock = _userSvcMock_;
            ideaSvcMock = _ideaSvcMock_;

            spyOn($state, 'go');
            spyOn(userSvcMock, 'isUserLoggedIn').and.callFake(function() {
                return false;
            });

            ctrl = $controller('AccountViewCtrl', {
                $scope: scope,
                $state: $state,
                toastSvc: toastSvc,
                userSvc: userSvcMock,
                ideaSvc: ideaSvcMock
            });
        }));

        it('should exist', function() {
            expect(ctrl).toBeDefined();
        });

        it('should navigate to home if no user is logged in', function() {
            expect($state.go).toHaveBeenCalledWith('home');
        });
    });

    describe('visiting when logged in', function() {
        beforeEach(inject(function($rootScope, $controller, _$state_, _toastSvc_, _userSvcMock_, _ideaSvcMock_) {
            scope = $rootScope.$new();
            $state = _$state_;
            toastSvc = _toastSvc_;
            userSvcMock = _userSvcMock_;
            ideaSvcMock = _ideaSvcMock_;

            spyOn($state, 'go');
            spyOn(userSvcMock, 'isUserLoggedIn').and.callFake(function() {
                return true;
            });

            ctrl = $controller('AccountViewCtrl', {
                $scope: scope,
                $state: $state,
                toastSvc: toastSvc,
                userSvc: userSvcMock,
                ideaSvc: ideaSvcMock
            });
        }));

        it('should exist', function() {
            expect(ctrl).toBeDefined();
        });

        it('should populate user data if a user is logged in', function() {
            expect(scope.user).toBeDefined();
        });

        describe('$scope.logout', function() {

            beforeEach(function() {
                spyOn(userSvcMock, 'logout').and.callFake(function() { });
                spyOn(toastSvc, 'show');
            });

            it('should log out the user', function() {
                scope.logout();

                expect(userSvcMock.logout).toHaveBeenCalled();
                expect(toastSvc.show).toHaveBeenCalled();
                expect($state.go).toHaveBeenCalledWith('home');
            });
        });
    });
});
