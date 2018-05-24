<?php

namespace App\Controller;

use App\Form\PromoteType;
use App\Repository\FOSUserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class AdminController extends Controller
{
    /**
     * @Route("/profile", name="admin_index", methods="GET")
     */
    public function index(): Response
    {
        return $this->render('admin/index.html.twig');
    }
    
    /**
     * @Route("/users", name="admin_users", methods="GET")
     */
    public function users(FOSUserRepository $FOSUserRepository): Response
    {
        return $this->render('admin/users.html.twig',[
            'users' => $FOSUserRepository->findAll()
        ]);
    }
    
    /**
     * @Route("/users/promote/{id}", name="admin_user_promote", methods="GET|POST")
     */
    public function promote($id, FOSUserRepository $FOSUserRepository, Request $request):Response
    {
        $user = $FOSUserRepository->find($id);
        $form = $this->createForm(PromoteType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            
            $this->getDoctrine()->getManager()->flush();
            return $this->redirectToRoute('admin_users');
        }
        return $this->render('admin/promote.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
        
    }
}
